const url = "http://localhost:3000/users";
const vm = new Vue({
  el:"#app",
  data:{
    users: [],
    msg:"",
    addUser:
    {
      name: null,
      age: null
    },
  },
  async mounted(){
    axios.get(url).then(res => {
      this.users = res.data
    })
    console.log(this.users);
  },
  methods:{
    async deleteUser(index){
      const id = this.users[index]._id;
      console.log(url + '/' + id);
      await axios.delete(url + '/' + id).then(req => {
        console.log(req);
      });
      this.users.splice(index,1);
    },
    
    async pushUser(){
      await axios.post(url,this.addUser);
      await axios.get(url).then(res => {
      this.users = res.data;
      });
      document.getElementById('nameInput').value = '';
      document.getElementById('ageInput').value = '';
    },

    async updateUser(index){
      const id = this.users[index]._id;
      await axios.put(url + '/' + id, this.users[index]);
      window.location.reload();
    }
  },

  //   async updateUser_2(index){
  //     let newName = document.getElementById("new-name").value
  //     document.getElementById("newName").value = '';
  //     let newAge = document.getElementById("new-age").value
  //     document.getElementById("newAge").value = '';

  //     const id = this.users[index]._id;
  //     this.users[index].name = newName;
  //     this.users[index].age = newAge;

  //     await axios.put(url + '/' + id, this.users[index]);
  //     console.log(this.users[index]);
  //     console.log(url + '/' + id);
  //     alert("user has been updated!");
  //   }
  // },

  
})