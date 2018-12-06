export default function ({ store, error, redirect, req }) {
  if (!store.state.adminToken) {
    redirect('/login')
  }
}
