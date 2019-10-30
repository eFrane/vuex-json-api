function getExpectedResponse (currentResource) {
  if (!currentResource.id && !currentResource.type) {
    throw new Error('Resources must have an id-property and a type-property.')
  }
  return {
    id: currentResource.id,
    data: Object.assign(
      currentResource, {
        id: currentResource.id,
        type: currentResource.type
      }
    )
  }
}

export { getExpectedResponse }
