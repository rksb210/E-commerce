// import { TextField } from "@mui/material";
// import InputAdornment from '@mui/material/InputAdornment';
// import Search from '@mui/icons-material/Search';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';

// export default function SearchComponent(props){
//   const theme = useTheme();
//       const matches = useMediaQuery(theme.breakpoints.down('sm'));
//         return (
//             <div style={{borderRadius:10,paddingLeft:15,paddingRight:10,background:'#fff',borderRadius:5,width:'100%',height:38,display:'flex',justifyContent:'center',alignItems:'center',marginLeft:matches?0:180}}>
//             <TextField
//                  fullWidth
//                  hiddenLabel
//                  placeholder="What are you looking for?"
//                  variant="standard"
//                  size="small"
//                 InputProps={{
//                    disableUnderline:true,
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <Search />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//                 </div>
//         )
// }



import { TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SearchComponent(props){
      const theme = useTheme();
      const matches = useMediaQuery(theme.breakpoints.down('sm'));
      const matchesSearch = useMediaQuery('(max-width:950px)');
        return (
          <div style={{width:'100%'}}>
            <TextField
                 fullWidth
                 hiddenLabel                 
                 placeholder='What are you looking for?'               
                 variant="standard"
                 sx={{'& input::placeholder':matchesSearch?{fontSize:13}:{fontSize:15},}}
                 style={{background:'white',borderRadius:5,height:40,paddingLeft:10,display:'flex',justifyContent:'center',}}
                InputProps={{
                   disableUnderline:true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
             </div>  
        )
}