import { useEffect, useState } from "react";
import Button from '@mui/material/Button'
// import FileCopyIcon from '@mui/icons-material/FileCopy';
import clipboardCopy from "clipboard-copy";



const ClipBoard = ({team1,team2}) => {

   const [ListaTeamUno,setListaTeamUno] = useState(team1)
   const [ListaTeamDos,setListaTeamDos] = useState(team2)
   
   const arrayDeStrings = ListaTeamUno;
   const arrayDeStringsDos = ListaTeamDos
   const cadenaCopy = "--Team 1--"+"\n" + arrayDeStrings.join("\n")+"\n" + "--Team 2--"+"\n" + arrayDeStringsDos.join("\n")


  const handleCopyToClipboard = async () => {
    try {
      await clipboardCopy(cadenaCopy);
      
    } catch (err) {
      throw new Error 
    }
  };

  useEffect(() => {
    setListaTeamUno(team1)
    setListaTeamDos(team2)
  }, [team1,team2])
  

  return (
    <div className="mt-1 md:mb-3">
      
      <Button
      sx={{  }}
        variant="contained"
        color="primary"
        onClick={handleCopyToClipboard}
      >
        <span className="text-xs">Copiar</span>
       {/* <FileCopyIcon /> */}
      </Button>
    </div>
  );
};

export default ClipBoard;
