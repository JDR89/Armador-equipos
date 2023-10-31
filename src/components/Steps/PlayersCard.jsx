import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { CardLayout } from "../../layout/CardLayout";
import { players as jugadores } from "../../../jugadores.json";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useForm } from "../../hooks/useForm";

export const PlayersCard = ({setSelectedPlayers,selectedPlayers}) => {
  const [players,setPlayers] = useState(jugadores);
  
  const [newBot, setNewBot] = useState({
    name:"",
    position:"",
    selected: false
  })

  const{position,name,onInputChange,onResetForm}=useForm(newBot)
  

  players.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  // const onChangePlayer=(e)=>{
  //   const{name,value}=e.target

  //   setNewBot({
  //     ...newBot,
  //     [name]:value
  //   })
      
  // }

  const onSubmit=(e)=>{
    e.preventDefault()

 

    const botEntry = {
      ...newBot,
      name: name + " (" + position.toLowerCase()+")",
      position: position,
      id:new Date().getTime()
    }

    setPlayers([...players,botEntry])

   onResetForm()
  }
  
  
  const choosePlayers=(id)=>{
    const playerIndex = players.findIndex(player=>player.id === id)
    
    if(playerIndex !== -1){
      const getTruePlayer = [...players]
      
      getTruePlayer[playerIndex].selected = !getTruePlayer[playerIndex].selected
      const list = getTruePlayer.filter(e=>e.selected === true) 
      
      setSelectedPlayers(list)
    }
   
  }


 

  return (
    <CardLayout>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-7">
        {players.map((player) => (
          <Button
           key={player.id}
           className={`h-10 text-black ${player.selected ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : ''}`}
           variant="outlined" 
           size="small"
           onClick={()=>choosePlayers(player.id)}
           
           >
            {player.name}
          </Button>
        ))}
      </div>
      <hr className="my-4" />
      <div  className="">

        <form
          className="flex justify-center w-full"
          onSubmit={onSubmit}
        >
          <TextField
            type="text"
            label="Agregar bot"
            variant="outlined"
            name="name"
            onChange={onInputChange}
            value={name}
            required
            inputProps={{ maxLength: 17 }}
          />

          
          <Select
            type="select"
            name="position"
            onChange={onInputChange}
            defaultValue="def"
            value={position}
            required
          >
            <MenuItem value="def">Defensa</MenuItem>
            <MenuItem value="med">Medio</MenuItem>
            <MenuItem value="del">Delantero</MenuItem>
          </Select>

          
          
          <Button type="submit">
            <AddIcon />
          </Button>
          
          

        </form>
      </div>

      <hr className="mt-4"/>

      <div className="flex justify-center mt-5 ">
         <Typography>Seleccionados: <span className="font-semibold">{selectedPlayers.length}</span> </Typography>
      </div>
      
    </CardLayout>
  );
};
