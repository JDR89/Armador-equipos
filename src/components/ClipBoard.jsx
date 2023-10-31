import { useEffect, useState } from "react";
import Button from '@mui/material/Button'
// import FileCopyIcon from '@mui/icons-material/FileCopy';
import clipboardCopy from "clipboard-copy";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';


const ClipBoard = ({team1,team2}) => {

   const [ListaTeamUno,setListaTeamUno] = useState(team1)
   const [ListaTeamDos,setListaTeamDos] = useState(team2)

   
   const arrayDeStrings = ListaTeamUno;
   const arrayDeStringsDos = ListaTeamDos
   const cadenaCopy = "--Team 1--"+"\n" + arrayDeStrings.join("\n")+"\n" +"\n" + "--Team 2--"+"\n" + arrayDeStringsDos.join("\n")

   const notify = () => toast("Copiado!");

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
        <span onClick={notify} className="text-xs">Copiar</span>
       {/* <FileCopyIcon /> */}
       
      </Button>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
};

export default ClipBoard;
