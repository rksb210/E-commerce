import Header from "../Header";
import SortByComponent from "./sortby/SortByComponent";
import FilterByComponent from "./filterby/FilterByComponent";
import DescriptionComponent from "./DescriptionComponent";
import { useStyles } from "./ProjectCss";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FilterBarComponent from "./filterby/FilterBarComponent";


export default function ProductFilterComponent(){
    var classes = useStyles()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
      const matchesSearch = useMediaQuery(theme.breakpoints.down('sm'));

    return (<div>
        <div className={classes.home_root} >
             <div style={{position:'sticky',top:0,zIndex:2}}><Header/></div> 
             
            <div style={{display:'flex'}}>
             <div style={{margin:matches?'0px 0px 0px 1%':'4% 0 0 10%'}}>
             
             {matches?<></>:<span><SortByComponent /></span>}

             {matches?<></>:<span><FilterByComponent /></span>}
             </div>
             <span  style={{margin:matches?'0px':'2% 0 0 5%'}}><DescriptionComponent /></span>
             
             </div>

             {matches?
               <div style={{position:'sticky',bottom:0,zIndex:2}}><FilterBarComponent /></div>
               :<></>
              }

             {/* <div><hr color='#9a9a9a' style={{transform:'rotate(90deg)',background:'red',width:'60%',align:'left,'}} /></div> */}
        </div>
        
        </div>)
}