import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowForwardIosTwoToneIcon from "@mui/icons-material/ArrowForwardIosTwoTone";
import ArrowBackIosTwoToneIcon from "@mui/icons-material/ArrowBackIosTwoTone";
import { PlayersCard } from "./PlayersCard";
import { TeamsConfirm } from "./TeamsConfirm";
import { PosibleFormacion } from "./PosibleFormacion";

const steps = ["Jugadores", "Confirmar equipos", "Posible formación"];

function Steps() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  // const [confirmPlayers, setConfirmPlayers] = useState([]);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    if (activeStep === 0) {
      
      division(selectedPlayers)
    }

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // Cancelar la seleccion 
    if( activeStep === 1 ){
       
       setTeam1([]) 
       setTeam2([]) 
      }
      
    
  };

  const onReset=()=>{
    window.location.reload()
  }

  const division = async(arr) => {
    const defenders = arr.filter((e) => e.position === "def");
    const mediums = arr.filter((e) => e.position === "med");
    const delanteros = arr.filter((e) => e.position === "del");

   
    // Division de defensores (en caso de ser impar se le suma +1 a team1)

    await new Promise((resolve) => {
      if (defenders.length % 2 === 0) {
        
        const mitad = Math.floor(defenders.length / 2);
  
        const primeraMitad = defenders.slice(0, mitad);
        const segundaMitad = defenders.slice(mitad);
  
        setTeam1((prevTeam1) => [...prevTeam1, ...primeraMitad]);
        setTeam2((prevTeam2) => [...prevTeam2, ...segundaMitad]);
        
      } else {
       
        const mitad = Math.floor(defenders.length / 2);
  
        const primeraMitad = defenders.slice(0, mitad + 1);
        const segundaMitad = defenders.slice(mitad + 1);
  
        setTeam1((prevTeam1) => [...prevTeam1, ...primeraMitad]);
        setTeam2((prevTeam2) => [...prevTeam2, ...segundaMitad]);
       
      }
  
      resolve();
    });
  
    // División de medios
    await new Promise((resolve) => {
      // Primera parte: divide en dos si son pares y si los defensores son pares
      if (defenders.length % 2 === 0 && mediums.length % 2 === 0) {
        
        const mitad = Math.floor(mediums.length / 2);
  
        const primeraMitad = mediums.slice(0, mitad);
        const segundaMitad = mediums.slice(mitad);
  
        setTeam1((prevTeam1) => [...prevTeam1, ...primeraMitad]);
        setTeam2((prevTeam2) => [...prevTeam2, ...segundaMitad]);
        
      }

      // Segunda parte da +1 al primer equipo en caso que los defensores hayan sido par y medios impar
    if(defenders.length % 2 === 0 && mediums.length % 2 !== 0){
      
      const mitad = Math.floor(mediums.length / 2);

      const primeraMitad = mediums.slice(0, mitad + 1);
      const segundaMitad = mediums.slice(mitad + 1);

      setTeam1((prevTeam1) => [...prevTeam1, ...primeraMitad]);
      setTeam2((prevTeam2) => [...prevTeam2, ...segundaMitad]);
      
    }

    // Tercera parte Defensa par y Medio impar
    if(defenders.length % 2 !== 0 && mediums.length % 2 === 0){
      
      const mitad = Math.floor(mediums.length / 2)

      const primeraMitad = mediums.slice(0, mitad );
      const segundaMitad = mediums.slice(mitad );

      setTeam1((prevTeam1) => [...prevTeam1, ...primeraMitad]);
      setTeam2((prevTeam2) => [...prevTeam2, ...segundaMitad]);
     
    }

    // Cuarta parte Defensores y Medios impares
    if(defenders.length % 2 !== 0 && mediums.length % 2 !== 0){
      
      const mitad = Math.floor(mediums.length / 2);

      const primeraMitad = mediums.slice(0, mitad + 1);
      const segundaMitad = mediums.slice(mitad + 1);
      
      setTeam1((prevTeam1) => [...prevTeam1, ...segundaMitad]);
      setTeam2((prevTeam2) => [...prevTeam2, ...primeraMitad]);
      
    }
  
      resolve()

      
    });


    // Agregamos delanteros
   await new Promise((resolve) => {
      
      if(delanteros.length % 2 === 0){
        const mitad = Math.floor(delanteros.length / 2);
  
        const primeraMitad = delanteros.slice(0, mitad);
        const segundaMitad = delanteros.slice(mitad);
  
        setTeam1((prevTeam1) => [...prevTeam1, ...primeraMitad]);
        setTeam2((prevTeam2) => [...prevTeam2, ...segundaMitad]);
      } else {
        const mitad = Math.floor(delanteros.length / 2);
  
        const primeraMitad = delanteros.slice(0, mitad + 1);
        const segundaMitad = delanteros.slice(mitad + 1);
  
        setTeam2((prevTeam1) => [...prevTeam1, ...primeraMitad]);
        setTeam1((prevTeam2) => [...prevTeam2, ...segundaMitad]);
      }

      resolve()
      return {team1,team2}
    })
  

    console.log("Defensores:",defenders)
    console.log("Medios:",mediums)
    console.log("Delanteros:",delanteros)
    // console.log("Team 1",team1)
    // console.log("Team 2",team2)
  };

  // useEffect(() => {
  //       division(confirmPlayers)
          
  // }, [confirmPlayers]);


 
 
  

  return (
    <div className="mt-10">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Card>
        <CardContent>
          {activeStep === 0 && (
            <PlayersCard
              selectedPlayers={selectedPlayers}
              setSelectedPlayers={setSelectedPlayers}
            />
          )}
          {activeStep === 1 && <TeamsConfirm team1={team1} team2={team2}  />}
          {activeStep === 2 && <PosibleFormacion/>}
        </CardContent>
      </Card>
      <div className="flex justify-center mt-5">
        <Button
          style={{ margin: "1rem", display: activeStep === 0 || activeStep === 1 ? "none" : "block" }}
          variant="contained"
          className={`${
            activeStep === 0 ? "hidden" : ""
          } bg-gradient-to-r from-cyan-500 to-blue-500 m-10`}
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          <ArrowBackIosTwoToneIcon />
        </Button>

          {/* BOTON MOMENTANEO HASTA CAMBIAR PLAYERS CON BOTS INCLUIDOS */}
        <Button
          style={{ margin: "1rem", display: activeStep === 0 || activeStep === 2 ? "none" : "block" }}
          variant="contained"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 m-10"
          disabled={activeStep === 0}
          onClick={onReset}
        >
          Res
        </Button> 




        <Button
          style={{ margin: "1rem" }}
          className="bg-gradient-to-r from-cyan-500 to-blue-500"
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={
            activeStep === steps.length - 1 ||
            (selectedPlayers.length !== 18 &&
              selectedPlayers.length !== 14 &&
              selectedPlayers.length !== 22 &&
              selectedPlayers.length !== 10 &&
              selectedPlayers.length !== 12)
          }
        >
          <ArrowForwardIosTwoToneIcon />
        </Button>
      </div>
    </div>
  );
}

export default Steps;
