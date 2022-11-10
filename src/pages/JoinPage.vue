<script>
import axios from 'axios'
export default {
  data() {
    return {
        username: '',
        name:'',
      showMessage:'',
        roomId: '',
        joinSuccess:false,
        isInvalidInput: false,
      roomIdName:null,
      error:null,
      message:'',
      messages: [],
      users: [],
      lastMessagesArrayLength:0
    }
  },
    methods: {
        enterChat() {
            this.$router.push({
                name: 'chat',
                params: {
                    username: this.name,
                    roomIdName:this.roomIdName
                }
            })
        },
        async joinRoom() {
            if (this.username.trim() === '' || !this.roomId.trim()) {
                // this.isInvalidInput = true;
                alert('Please input username and roomId')
                return;
            }
            // this.isInvalidInput = false;
            this.error = null;
            this.name = this.username;
            await axios.post('http://localhost:3000/join', {
                username: this.username,
                roomID: this.roomId
            }).then(response => {
                if (response.status === 201) {
                    console.log('success', response.data)
                    this.roomIdName=response.data.roomID
                    this.joinSuccess = true;
                } else if (response.status === 401)  {
                    console.log('error', response.data)
                    return this.error=response.data.message
                }
            }).catch(error => {
                console.log('err', error.message)
                alert(error.message)
                // this.error = error.message
            })
            this.username = '';
            this.roomId = '';
            if (this.joinSuccess) this.enterChat()
            // this.$router.push('/chat')
        }
    },
    // onMounted() {
    //     this.username = ''
    //     this.roomId = ''
    //     this.isInvalidInput = false
    //     this.error = null
    //     this.joinSuccess=null
    // }
}
</script>

<template>
  <div>
    <section>
      <header>
        <h1>Join Chatroom</h1>
      </header>
    </section>
  </div>
  <div>
    <section v-if="error!==null">
        <p>{{ error }}</p>
    </section>
  </div>
  <div>
    <section>
      <form @submit.prevent="joinRoom">
        <div>
          <input type="text" placeholder="Username" v-model="username">
        </div>
        <div>
          <input type="text" placeholder="roomID" v-model="roomId">
        </div>
        <div>
          <button>JOIN</button>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>

h1 {
  font-size: 2rem;
  /* border-bottom: 1px solid #ccc; */
  color: #4fc08d;
  margin: 1rem 0rem 2rem 0;
}

p {
  font-size: 1rem;
  font-weight: 100;
  width: fit-content;
  margin: -3rem 0rem 1rem 30rem;
  border: 1px solid #4fc08d;
  background-color: #4fc08d;
  color: white;
  padding: 0.5rem;
  border-radius: 10px;
}

input {
  font: inherit;
  border-color: #ccc;
  background-color: #f6f6f6;
  width: 50%;
  height: 8vh;
  margin-bottom: 5px;
  border: 2px solid #ccc;
  border-radius: 10px;
}

input:focus {
  outline: none;
  border-color: #5db075;
  background-color: #e8e8e8;
}

button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #5db075;
  border-radius: 10px;
  background-color: #5db075;
  color: white;
  margin: 10px ;
  padding: 1rem 2rem 1rem 2rem ;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}

button:hover,
button:active {
  background-color: #e8e8e8;
  border-color: #5db075;
  color: #5db075;
  font:inherit;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}
</style>
