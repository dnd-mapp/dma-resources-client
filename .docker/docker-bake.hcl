variable "TAGS" {
    default = [
        "latest"
    ]
    type = list(string)
}

target "default" {
    context = "."
    dockerfile = ".docker/Dockerfile"
    platforms = [
        "linux/amd64",
        "linux/arm64"
    ]
    tags = [
        for tag in TAGS: "ghcr.io/dnd-mapp/dma-resources-client:${tag}"
    ]
    annotations = [
        "org.opencontainers.image.title=D&D Mapp - Web client",
        "index,manifest:org.opencontainers.image.description=The management client for the D&D Mapp: resources server",
        "org.opencontainers.image.authors=NoNamer777",
        "org.opencontainers.image.source=https://github.com/dnd-mapp/dma-resources-client",
        "org.opencontainers.image.documentation=https://github.com/dnd-mapp/dma-resources-client/blob/main/.docker/README.md",
    ]
    attest = [
        "type=provenance,mode=max",
        "type=sbom"
    ]
    cache-from = [
        "type=gha"
    ]
    cache-to = [
        "type=gha,mode=max,repository=dnd-mapp/dma-resources-client"
    ]
    secrets = [
        "type=env,id=NODE_AUTH_TOKEN,env=ACTIONS_RUNTIME_TOKEN"
    ]
}
