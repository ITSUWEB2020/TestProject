<template>
<div>
  <div class="buysnackbar">
      <a  @click="showModal = true" class="myButton">Add category</a>
  <div class="cust">
       <table id="customers">
    <tr>
      <th>Category name</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Detail</th>
    </tr>
   <tr  c v-for="category in Category" :key="category.key">
      <td>{{category.Name}}</td>
      <td>{{category.Quantity}}</td>
      <td>{{category.Price}}</td>
      <td><button class="butt1" @click.prevent="RoutTo(category.key)">
                    About
                  </button></td>
   </tr>
      </table>
  </div>
   <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModal"
        @click="showModal = false"
      ></div>

    </transition>
    <transition name="slide" appear>
       <form novalidate="true" @submit.prevent="onFormSubmit">
        <div class="modal" v-if="showModal">
          <p class="text">Create a new category</p>
          <input type="text" class="inputName" v-model="category.Name">
          <input type="number" class="inputPrice"  v-model.number="category.Quantity">
          <input type="number" class="inputQuant"  v-model.number="category.Price">
          <ul>
            <li>Enter name</li>
            <li>Enter quantity</li>
            <li>Enter price</li>
          </ul>
            <button class="myButton" type="submit">Add</button>
        </div>
      </form>
    </transition>
  </div>
  <div class="setsnackbar">
    <!-- <div id = "intro" style = "text-align:center;">
         <h1>{{ timestamp }}</h1>
      </div> -->
  </div>
  <div class="buysnackbarstat">
     <table id="customers">
    <tr>
      <th>Category name</th>
      <th>Price</th>
      <th>Order date</th>
  
    </tr>
   <tr  c v-for="statistics in Statistics" :key="statistics.key">
      <td>{{statistics.Name}}</td>
      <td>{{statistics.Price}}</td>
      <td>{{statistics.Orderdate}}</td>
   </tr>
      </table>
  </div>
</div>
</template>


<script>
import { db } from "../main";
import routes from "../router/index.js";
export default {
  name: 'mainn',
  data () {
    return {
       showModal: false,
       timestamp: "",

      Category: [],
      category: {
      },
      Item: [],
      item: {
        
      },
       Statistics:[],
        statistics:{
         
        }
      
    };
  },
  created() {
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
     db.collection("Statistics").onSnapshot((snapshotChange) => {
      this.Statistics = [];
      snapshotChange.forEach((doc) => {
        this.Statistics.push({
          key: doc.id,
          Price: doc.data().Price,
          Name: doc.data().Name,
          Orderdate: doc.data().Orderdate,
          
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
      db.collection("Category")
        .add(this.category)
        .then(() => {
          alert("Category successfully created!");
        
        })
        .catch((error) => {
          console.log(error);
        });
    },
  
          RoutTo(key) {
        routes.push({
        name: "item",
        params: {
          id: key,
        },
      });
      location.reload()
    },
    
    
  },
   computed: {
    sum() {
      let result = 0;
      this.statistics.Price.forEach(el=> result += el.price);
      return result;
    },
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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

.modal {
  position: fixed;
  top: 25%;
  left: 25%;
  transform: translate(-50%, -50%);
  z-index: 99;

  width: 40%;
  height: 40%;
  background: #ffffff;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.24);
  border-radius: 32px;
}
</style>
