const PREFIX = `${import.meta.env.VITE_BASE_URL}`

export const ApiUser = {
  getUserList: `${PREFIX}/api/user/get-user-list`,
  userAdd: `${PREFIX}/api/user/add`,
  userEdit: `${PREFIX}/api/user/edit`
}