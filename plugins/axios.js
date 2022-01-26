// import { useSipCookies } from './universal-cookies'

export default function ({ $axios, redirect, app, isDev }) {
  $axios.onRequest((config) => {
    if (isDev) console.log('Making request to ' + config.url)
  })

  // $axios.onError((error) => {
  //   const whitelistAuthPath = ['/login', '/logout']

  //   if (whitelistAuthPath.includes(error.config.url)) {
  //     return
  //   }

  //   const hasUserCookie = useSipCookies().get('user_id')

  //   const code = parseInt(error.response && error.response.status)

  //   if ([400].includes(code) && error.response.data.errors?.user?.includes?.('MustAuthorized')) {
  //     app.$toast.error('Peran anda tidak bisa melakukan transaksi')
  //   } else if ([401, 403]?.includes?.(code) && hasUserCookie) {
  //     redirect('/logout')
  //   }
  // })
}
