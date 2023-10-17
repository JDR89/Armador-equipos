
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import { CardLayout } from '../../layout/CardLayout';
import ClipBoard from '../ClipBoard';





function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export const  TeamsConfirm=({team1,team2})=> {
 
  const teamUno = team1.map(e=>e.name)
  const teamDos = team2.map(e=>e.name)
  const [left, setLeft] = useState(teamUno);
  const [right, setRight] = useState(teamDos);
  const [checked, setChecked] = useState([]);


  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));



  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));


  };

  useEffect(() => {
    setLeft(team1.map((e) => e.name));
    setRight(team2.map((e) => e.name));
  }, [team1, team2]);


  

  const customList = (title, items) => (
    <Card>
      <CardHeader
      
        sx={{ px: 2, py: 1,background:"#6794ff" }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length}`}
      />
      
      <Divider />
      <List
        sx={{
          width: 200,
          height: 355,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value,index) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={index}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <CardLayout>
    <Grid  container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList('Equipo 1', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">

          <div  className='flex md:flex-col'>
          
          <div>
          <ClipBoard team1={left} team2={right}/>
          </div>

          
          <Button
            sx={{ my: .5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: .5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          </div>
        </Grid>
      </Grid>
      <Grid item>{customList('Equipo 2', right)}</Grid>
    </Grid>

    

    </CardLayout>
  );
}










