/**
 * This type is intended to be used for API contracts and controllers but not DB operations and services as it does not capture all of the properties of the User model.
 */
export interface UserDto {
  id: string;
  email: string;
  password: string;
}
