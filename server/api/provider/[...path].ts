import { getRequestHeaders, getMethod, readRawBody, setResponseStatus, setResponseHeader } from 'h3'

const FORWARD_HEADERS = ['authorization', 'x-api-key', 'content-type', 'content-length']

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBaseUrl = config.apiBaseUrl as string
  if (!apiBaseUrl) {
    throw createError({ statusCode: 500, message: 'apiBaseUrl is not configured' })
  }

  const pathParam = event.context.params?.path
  const path = typeof pathParam === 'string' ? pathParam : Array.isArray(pathParam) ? pathParam.join('/') : ''
  const targetUrl = path ? `${apiBaseUrl.replace(/\/$/, '')}/${path}` : apiBaseUrl

  const method = getMethod(event)
  const headers = getRequestHeaders(event)
  const forwardHeaders: Record<string, string> = {}
  for (const name of FORWARD_HEADERS) {
    const value = headers[name]
    if (value && typeof value === 'string') forwardHeaders[name] = value
  }

  let body: string | undefined
  if (method !== 'GET' && method !== 'HEAD') {
    body = await readRawBody(event)
  }

  const response = await $fetch.raw(targetUrl, {
    method,
    headers: Object.keys(forwardHeaders).length ? forwardHeaders : undefined,
    body: body ?? undefined,
    ignoreResponseError: true,
  })

  setResponseStatus(event, response.status, response.statusText)
  const resHeaders = response.headers
  if (resHeaders && typeof resHeaders.forEach === 'function') {
    resHeaders.forEach((value: string, key: string) => {
      if (key.toLowerCase() !== 'content-encoding') {
        setResponseHeader(event, key, value)
      }
    })
  }

  return response._data
})
