import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const resourceHost = 'http://localhost:3000'

export default new Vuex.Store({

  /*
    상태
    일반적으로 컴포넌트에서는 his.$store.state.count 와 같이 접근한다.
    mapState 헬퍼를 사용하면
    import { mapState } from 'vuex'
    computed: mapState({
      // 화살표 함수는 코드를 매우 간결하게 만들어 줍니다!
      count: state => state.count,
    }
    와 같이 사용할 수 도 있다.
    https://vuex.vuejs.org/kr/guide/state.html

   */
  state: {
    accessToken: localStorage.getItem('access-token') || '',
    status: '',
    username: ''
  },
  /*
    getter
    state 의 계산해야 할 경우 각 컴포넌트에서 state 를 불러와 계산하는것보다
    getters 를 통해 계산하고 각 컴포넌트에서는 store.getters.doneTodos 와 식으로 호출한다.
    함수를 반환하여 getter로 전달할수도 있음
    mapGetters 헬퍼를 사용할수 도 있음
    https://vuex.vuejs.org/kr/guide/getters.html
   */
  getters: {
    isAuthenticated: state  => !!state.accessToken,
    authStatus: state => state.status,
    getUserName: state => state.username
  },
  /*
    mutations(변이)
    store 의 state 를 변경하기 위해 사용
    store.commit('LOGIN') 와 같이 사용할 수 있음
    페이로드를 가질경우
    store.commit('LOGIN', data) 와 같이 사용
    객체스타일
    store.commit({
      type: 'increment',
      amount: 10
    })
    https://vuex.vuejs.org/kr/guide/mutations.html
     */
  mutations: {
    LOGIN (state, {data}) {
      state.accessToken = data.token
      state.username = data.name
      //모든 HTTP 요청 헤더에 Authorization 을 추가한다. ( axios 기본 설정값 설정 참조 )
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      localStorage.setItem('access-token', data.token)
    },
    LOGOUT (state) {
      state.accessToken = null
      state.status = ''
      localStorage.removeItem('access-token')
    },
    KAKAO_LOGIN (state) {
      console.log(state)
    }
  },

  /*
    action
    변이와 비슷하지만 몇가지 다름
    - 상태를 변이시키는 대신 액션으로 변이에 대한 커밋을함
    - 작업에는 임의의 비동기 작업이 포함될수 있음
    store.dispatch('LOGIN') 와 같이 사용
    mutations 는 state 변경에 대해 동기적이어야 하지만 action은 비동기작업을 수행가능하다.
    https://vuex.vuejs.org/kr/guide/actions.html
    - vuex actions returning promises.
   */
  actions: {
    async LOGIN ({commit}, {email, password}) {
      return await axios.post(`${resourceHost}/api/auth/login`,{email, password})
        .then(({data}) => {
          commit('LOGIN', {data}) //json 형태로 보내야됨 아니면 undefind 로 보내짐
        })
    },
    LOGOUT ({commit}) {
      commit('LOGOUT')
    },
    async KAKAO_LOGIN({commit}) {
      // const params = {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin": "http://localhost:3000",
      //     "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      //     "Access-Control-Allow-Headers": "X-Requested-With,content-type",
      //     "Access-Control-Allow-Credentials": true,
      //   },
      //   withCredentials: true,
      //   data: undefined
      // }
      // return await axios.get(`${resourceHost}/api/auth/kakao`,params)
      return await axios.get(`${resourceHost}/api/auth/kakao`)
        .then(({data}) => {
          commit('KAKAO_LOGIN', {data}) //json 형태로 보내야됨 아니면 undefind 로 보내짐
        })
    }
  }
})
