import { useState } from "react"
import "./App.css"

function App() {

  const items = [
    {
      name: "Black Water Bottle",
      type: "Lost",
      location: "Library",
      category: "Others",
      date: "2026-09-12",
    },
    {
      name: "Blue Calculator",
      type: "Found",
      location: "Block B",
      category: "Electronics",
      date: "2026-08-13",
    },
    {
      name: "Black Backpack",
      type: "Found",
      location: "Block B",
      category: "Others",
      date: "2026-09-10",
    },
  ]

  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")

  const[showForm, setShowForm] = useState(false)

  const [itemName, setItemName] = useState("")

  const [type, setType] = useState("Lost")
  const [location, setLocation] = useState("")
  const [description, setDescription]= useState("")
  const [reportedItems, setReportedItems]= useState([])
  const [date, setDate] = useState("")

  const [selectedItem, setSelectedItem] = useState(null)
  
  const allItems = [...items, ...reportedItems]
  const filteredItems = allItems.filter((item) => {
    const matchesFilter =
      filter === "All" || item.type === filter

    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase())

    return matchesFilter && matchesSearch
  })
  
  const handleSubmit =(event) =>{
    event.preventDefault()
    
    const newItem = {
      name: itemName,
      type:type,
      category: category,
      location: location,
      description: description,
      date: date,
    }

    setReportedItems([...reportedItems, newItem])

    setItemName("")
    setLocation("")
    setDescription("")
    setType("Lost")
    setCategory("Other")
    setDate("")
    setShowForm(false)
  }

  const [category, setCategory]= useState("Other")

  return (
    <div className="app">
      
      
      <header>
        <h1>Campus Lost & Found</h1>
        <p>Find what you've lost. Return what you've found.</p>
      <button className="report-button"
        onClick= {()=> setShowForm(true)}>+ Report an Item</button>
      </header>

      {
        showForm && (
          <form className= "report-form" onSubmit = {handleSubmit}>
            <h2>Report an Item</h2>

            <select 
            value = {type}
            onChange= {(event) => setType(event.target.value)}
            >
              <option value = "Lost">Lost</option>
              <option value= "Found">Found</option>
            </select>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value= "Electronics">Electronics</option>
              <option vlaue ="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Documents">Documents</option>
              <option value="Other">Other</option>
            </select>

            <input
              type= "text"
              placeholder= "Item name"
              value = {itemName}
              onChange= {(event) => setItemName(event.target.value)}
              required
            />


            <input
              type = "text"
              placeholder="Location"
              value= {location}
              onChange = {(event) => setLocation(event.target.value)}
              required            
            />

            <input  type= "date"
            value= {date}
            onChange={(event)=> setDate(event.target.value)}
            required
            />

            <textarea
              placeholder="Description"
              value = {description}
              onChange = {(event) => setDescription(event.target.value)}
              required
            />

            <button type = "submit">Submit Report</button>

            <button onClick= {() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        )
      }

      <div className="search">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="filters">
        <button onClick={() => setFilter("All")}>
          All
        </button>

        <button onClick={() => setFilter("Lost")}>
          Lost
        </button>

        <button onClick={() => setFilter("Found")}>
          Found
        </button>
      </div>

      <h2>Recent Reports</h2>

      {
        selectedItem && (
          <div className="modal-overlay">
          <div className="item-details">
            <button 
            className="close-button"
            onClick={()=> setSelectedItem(null)}>
             ✕
            </button>

            <h2>{selectedItem.name}</h2>

            <span className={selectedItem.type.toLowerCase()}>
              {selectedItem.type}
            </span>
            
            <p>📍 Location: {selectedItem.location}</p>
            <p>📂 Category:  {selectedItem.category}</p>
            <p>📅 Date Found: {selectedItem.date}</p>

            <p>{selectedItem.description}</p>
          </div>
          </div>
        )
      }

      <div className="items-container">
        {filteredItems.map((item) => (
          <div 
            className="items-card"
            key={item.name}
            onClick= {()=> setSelectedItem(item)}
          >
            <h3>{item.name}</h3>

            <span className={item.type.toLowerCase()}>
              {item.type}
            </span>

            <p>📍 {item.location}</p>
            <p>📂 {item.category}</p>
            <p>📅 {item.date}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default App