import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import Navigation from '../components/Navigation'
import { loginUser, storeUserSession } from '../services/authServiceApi'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.email.trim() || !form.password.trim()) {
      setError('Email and password are both required.')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await loginUser({
        email: form.email.trim(),
        password: form.password
      })

      storeUserSession({
        userId: result.userId,
        username: result.username,
        email: result.email,
        token: result.token
      })

      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (submitError) {
      setError(submitError.message || 'Login was unsuccessful.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page-shell">
      <Navigation />

      <section className="content-panel auth-panel">
        <div className="auth-header">
          <p className="eyebrow">Access portal</p>
          <h1>Login</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </label>

          {error && <p className="auth-message error">{error}</p>}

          <button className="submit-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-switch">
          Need an account? <Link to="/signup">Create one</Link>
        </p>
      </section>
    </main>
  )
}

export default Login