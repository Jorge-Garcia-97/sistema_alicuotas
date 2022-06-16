import "./listusers.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DataUsers from "../../components/datausers/DataUsers"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DataUsers/>
      </div>
    </div>
  )
}

export default List