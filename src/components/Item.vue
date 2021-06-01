
<template>
  <div class="app">
    <div class="buyitemm">
      <p>Add items</p>
    <form  @submit.prevent="Submit"> 
      <label>item name</label>
      <input type="text" v-model="item.Names">
       <label>price</label>
       <select v-model="item.Price" >
            <option selected  v-for="category in Category" :key="category.key">
              <p class="name">{{category.Price }}</p>
            </option>
          </select>
           <label>quantity</label>
          <input type="number" v-model.number="item.Quantity">
    <button type="submit">Add</button></form>
    </div>
    <table class="table">
  <tr>
    <th>Item name</th>
    <th>items to sell</th>
    <th>Buy</th>
  </tr>

  <tr  c v-for="item in Items" :key="item.key">
    <td>{{item.Names}}</td>
    <td>{{item.Quantity}}</td>
    <td><button @click="showModal = true" class="myButton">Buy item</button></td>
  </tr>
</table>
 <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModal"
        @click="showModal = false"
      ></div>

    </transition>
    <transition name="slide" appear>
       <form novalidate="true">
        <div class="modal2" v-if="showModal">
          <form novalidate="true" @submit.prevent="onFormSubmit">
          <p class="text">Сonfirmation</p>
          <p>To confirm the purchase, enter the product information from the drop-down list</p>
            <select v-model="statistics.Name" >
            <option selected  v-for="item in Items" :key="item.key">
              <p class="name">{{ item.Names }}</p>
            </option>
          </select>
           <select v-model="statistics.Price">
            <option selected  v-for="item in Items" :key="item.key">
              <p class="name">{{ item.Price }}</p>
            </option>
          </select>
          <select v-model="statistics.Orderdate">
            <option selected  v-for="item in Items" :key="item.key">
              <p class="name">{{ timestamp }}</p>
            </option>
          </select>
            <button class="myButton" type="submit">Buy</button>
          
          </form>
        </div>
      </form>
    </transition>
</div>
</template>

<script>
import { db } from "../main";
export default {
    name: 'items',
    data: function () {
        
    return {
      timestamp: "",
        showModal: false,
        Items:[],
        item:{

        },
        Category:[],
        category:{

        },
        Statistics:[],
        statistics:{
         
        }
    
    }
},
     created() {
         this.Items = [];
         this.Category = [];
         db.collection("Category")
      .doc(this.$route.params.id)
      .collection("Items")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data())
          this.Items.push({
          key: doc.id,
          Quantity: doc.data().Quantity,
          Names: doc.data().Names,
          Price: doc.data().Price
          });
        })
      }),
        db.collection("Category").onSnapshot((snapshotChange) => {
      this.Category = [];
      snapshotChange.forEach((doc) => {
        this.Category.push({
          key: doc.id,
          Price: doc.data().Price,
          Quantity: doc.data().Quantity,
          Name: doc.data().Name,
          
        });
      });
    }),
     setInterval(this.getNow, 1000);
  },
   
          
          methods: {
   getNow: function() {
                    const today = new Date();
                    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    const dateTime = date;
                    this.timestamp = dateTime;
                },
                     onFormSubmit(event) {
      event.preventDefault();
      db.collection("Statistics")
        .add(this.statistics)
        .then(() => {
          alert("Purchase completed successfully");
        
        })
        .catch((error) => {
          console.log(error);
        });
    
      
    },
    Submit(event) {
      event.preventDefault();
      db.collection("Category").doc(this.$route.params.id).collection("Items")
        .add(this.item)
        .then(() => {
          alert("Item successfully created!");
        location.reload()
        })
        .catch((error) => {
          console.log(error);
        })
    
      
    }
          },
           
}

</script>

<style>
.buyitemm{
  position: relative;
  left: 2%;
  top: 1%;
  font-family: 'Courier New', Courier, monospace;
}
 ul 
  { 
 list-style-type: circle;
  list-style-position: outside;
  } 
 li 
 { 
   font-family: 'Courier New', Courier, monospace;
 padding: 15px; 
  margin: 0px; 
  }  
.text{
  font-family: 'Courier New', Courier, monospace;
  font-weight: 500;
  font-size: 20px;
  padding-left: 30%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
.inputName {
  position: absolute;
  width: 60%;
  height: 30px;
  top: 25%;
  right: 5%;
  background: #ffffff;
  border: 1px solid #1a1a1a;
  box-sizing: border-box;
  border-radius: 12px;
}
.inputPrice {
  position: absolute;
  width: 60%;
  height: 30px;
  top: 42%;
  right: 5%;
  background: #ffffff;
  border: 1px solid #1a1a1a;
  box-sizing: border-box;
  border-radius: 12px;
}
.inputQuant {
  position: absolute;
  width: 60%;
  height: 30px;
  top: 59%;
  right: 5%;
  background: #ffffff;
  border: 1px solid #1a1a1a;
  box-sizing: border-box;
  border-radius: 12px;
}
.myButton {
	box-shadow: 0px 10px 14px -7px #276873;
	background:linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
	background-color:#599bb3;
	border-radius:8px;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:10px;
	font-weight:bold;
	padding:2% 4%;
	text-decoration:none;
	text-shadow:0px 1px 0px #3d768a;
  position: relative;
  left: 1%;
  top: 1%;
}
.myButton:hover {
	background:linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
	background-color:#408c99;
}
.myButton:active {
	position:relative;
	top:1px;
}
.cust{
  position: relative;
  top: 3%;
}
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
.setsnackbar{
position: absolute;
width: 50%;
height: 50%;
left: 49.5%;
background: #1334;

}
.buysnackbarstat{
position: absolute;
width: 99%;
height: 50%;
top: 57%;

}
.buysnackbar{

position: absolute;
width: 49%;
height: 50%;
background: rgba(53, 65, 65, 0.267);
}
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal2 {
  position: fixed;
  top: 25%;
  left: 76%;
  transform: translate(-50%, -50%);
  z-index: 99;

  width: 40%;
  height: 40%;
  background: #ffffff;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.24);
  border-radius: 32px;
}
.table{
    position: relative;
    top: 14.4%;
}
.app{
    position: relative;
    left: 49.5%;
    width: 50.5%;
height: 22.5em;

}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 10px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
