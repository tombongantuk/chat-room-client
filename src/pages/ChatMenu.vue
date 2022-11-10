<script>
import io from 'socket.io-client'
import axios from 'axios'
export default {
    props:['username','roomIdName'],
    data() {
        return {
            messageInput:'',
            messages: [],
            isFromSameUsername: false,
            isExitSuccess:false,
            error:null,
            socket: io('http://localhost:3000'),
        }
    },
    methods: {
        joinServer() {
            this.socket.on('connect', () => {
                console.log(this.socket.id)
            })
            this.socket.on('recieve-message', (messages) => {
                console.log('from client', messages)
                // this.messages.map(e => {
                //     if (e.from === username) {
                //         this.isFromSameUsername=true
                //     }
                // })
                this.messages = messages
            })
        },
        sendMessage() {
            if (this.messageInput !== '') {
                this.messages.push({ from: this.username, text: this.messageInput })
                this.socket.emit('send-message', this.messages)
                this.messageInput = ''
            } else if (this.messageInput !== '') {
                alert('Cannot send blank message')
            }
        },
        leaveChat() {
            this.$router.push({
                name: 'join',
            })
        },
        async exit() {
            this.error = null;
            await axios.post('http://localhost:3000/exit', {
                username: this.username,
            }).then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    this.isExitSuccess=true
                } else if(response.status===404) {
                    console.log(response.data)
                    const errMsg=response.data.message
                    throw new Error(errMsg)
                }
            }).catch(error => {
                console.log(error.message)
                this.error
            })
            this.messages = []
            if (this.isExitSuccess) {
                this.leaveChat()
            }
        },
    },
    mounted() {
        this.joinServer()
    },
}
</script>

<template>
  <div>
    <section id="section1">
      <div>
        <button id="link" @click="exit">Exit</button>
      </div>
      <div>
        <span id="title">{{ roomIdName }}</span>
      </div>
    </section>
  </div>
  <div>
    <section id="section2">
        <div v-for="message in messages">
            <p :class="message.from===username?'input1':'input2'">{{ message.text }}</p>
            <br>
            <br>
            <br>
        </div>
    </section>
  </div>
  <div id="chatbox">
    <section>
      <input type="text" id="chatinput" v-model="messageInput">
      <button id="send" @click="sendMessage">Send</button>
    </section>
  </div>
</template>

<style scoped>
#section1{
  display: flex;
  margin:1rem auto;
 justify-content: center;
}
#section2{
  height: 25rem;
  border: 1px solid #5db075;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background-color: #ffffff;
  max-height: 90rem;
  overflow-y: scroll;
}
#link{
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26); */
  border: 1px solid #5db075;
  border-radius: 10px;
  font: small;
  cursor: pointer;
  color: white;
  background-color: #5db075;
  margin: 0rem 0rem 0rem -32rem;
  padding: 0.2rem ;
}
#title{
   margin: 0rem 0rem 0rem 0rem;
}
#chatinput{
  font: inherit;
  border-color: #ccc;
  background-color: #f6f6f6;
  width: 30rem;
  height: 5vh;
  margin-bottom: 5px;
  border: 2px solid #ccc;
  border-radius: 120px;
}
#chatbox{
  /* border:2px solid black; */
  /* box-shadow: 1px 1px 2px rgba(42, 247, 117, 0.979); */
  margin-top: 2rem;
}
.input1{
  color: #2b2222;
  font-family:'Times New Roman', Times, serif ;
  float: right;
  font-size: 1rem;
  font-weight: 100;
  /* margin-bottom: 1rem; */
  /* margin-right: 2rem; */
}
.input2{
  font-family:'Times New Roman', Times, serif ;
  font-size: 1rem;
  font-weight: 100;
  color: #2b2222;
  float: left;
  /* margin-left:2rem; */
}
.box{
    margin-bottom: 2rem;
}
header  {
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26); */
  margin: 1rem auto;
  /* border-radius: 10px; */
  padding: 0rem;
  /* background-color: #4fc08d; */
  color: black;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}
h1 {
  font-size: 2rem;
  /* border-bottom: 1px solid #ccc; */
  color: #4fc08d;
  margin: 1rem 0rem 2rem 0;
}

/* p {
  font-size: 1rem;
  font-weight: 100;
  width: fit-content;
  margin: -3rem 0rem 1rem 30rem;
  border: 1px solid #4fc08d;
  background-color: #4fc08d;
  color: white;
  padding: 0.5rem;
  border-radius: 10px;
} */

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

#send {
  font: inherit;
  cursor: pointer;
  border: 1px solid #5db075;
  border-radius: 120px;
  background-color: #5db075;
  color: white;
  margin: 10px ;
  padding: 0.5rem ;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}
a {
  text-decoration: none;
  font: inherit;
  cursor: pointer;
  /* border: 1px solid #5db075; */
  /* border-radius: 4px; */
  /* background-color: #5db075; */
  color: #5db075;
  /* margin: 10px ; */
  /* padding: 1rem 2rem 1rem 2rem ; */
  /* box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26); */
}
#send:hover,
#send:active {
  background-color: #e8e8e8;
  border-color: #5db075;
  color: #5db075;
  font:inherit;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}
</style>
