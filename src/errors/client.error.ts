export class ClientError {
  constructor(public readonly message: string, public readonly code = 400) {}
}
