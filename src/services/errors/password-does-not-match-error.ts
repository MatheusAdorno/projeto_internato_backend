export class PasswordDoesNotMatchError extends Error {
  constructor() {
    super('Password does not match.')
  }
}
