# Dockerfile for backend/canister logic (stub)
FROM dfinity/dfx:0.17.0 as builder
WORKDIR /code
COPY . .
RUN dfx build

FROM scratch
COPY --from=builder /code/.dfx /canister
# TODO: Add entrypoint for canister deployment
