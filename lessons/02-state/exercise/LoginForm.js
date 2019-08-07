import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  function handleSubmit(event) {
    event.preventDefault()

    setIsLoading(true)

    const [emailNode, passwordNode] = event.target.elements
    login(emailNode.value, passwordNode.value)
      .catch(error => {
        setIsLoading(false)
        setError(error)
      })
  }

  return (
    < form onSubmit={handleSubmit}>
      {error && (
        <div style={{ color: "red" }}>
          <p>Oops, there was an error logging you in.</p>
          <p>
            <i>{error.message}</i>
          </p>
        </div>
      )}
      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        type="text"
        id="login:email"
        className="inputField"
        placeholder="you@example.com"
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        type={showPassword ? "text" : "password"}
        className="inputField"
        placeholder="Password"
      />

      <div>
        <label>
          <input
            className="passwordCheckbox"
            type="checkbox"
            onClick={() => {
              handleShowPassword()
            }}
            defaultChecked={false}
          />{" "}
          show password
        </label>
      </div>

      <TabsButton>
        {!isLoading && <FaSignInAlt />}
        <span>{isLoading ? "Loading..." : "Login"}</span>
      </TabsButton>
    </form >
  )
}
