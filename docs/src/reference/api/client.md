# Gitlab SDK

## setupGitlab()

初始化 SDK，单例模式。

- **类型**
  ```ts
  function setupGitlab(config: GitlabSDKConfig): GitlabSDK
  ```
- **示例**

  ```ts
  import { setupGitlab } from '@zhengxs/gitlab-api'

  const client = setupGitlab({
    authority: 'https://gitlab.com',
    clientId: 'bf7178ecb1f12463b98f0a2be59fc74c7655fa6957dfdd940b01e644faaaf345',
    redirectURI: '/connect/gitlab/callback'
  })
  ```

## client.loginWithRedirect()

使用重定向的方式进行登录

- **类型**

  ```ts
  class GitlabSDK {
    loginWithRedirect(args?: GitlabSDKSigninRedirectArgs): Promise<void | never> 
  }
  ```

- **示例**

  ```ts
  // 支持 oauth2 的 code 模式
  // 如果已经登录就什么都不做
  await client.loginWithRedirect({
    responseType: 'token'
  })
  ```

## client.getUser()

获取用户信息。

- **类型**

  ```ts
  interface AuthClient {
    getUser(): Promise<Gitlab.User>
  }
  ```

- **示例**

  ```js
  const user = await client.getUser()

  // 登录用户信息
  console.log(user)
  ```
  