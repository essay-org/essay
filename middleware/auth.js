export default function ({ store, error, redirect, req }) {
  if (!store.state.token) {
    redirect('/login')
  }
}
