// "use client"

// /* eslint-disable react/prop-types */
// import HomeIcon from "@mui/icons-material/Home"
// import Breadcrumbs from "@mui/material/Breadcrumbs"
// import Chip from "@mui/material/Chip"
// import { styled } from "@mui/material/styles"

// const StyledBreadcrumb = styled(Chip)(({ theme }) => {
//   return {
//     backgroundColor: "#ffffff",
//     height: "36px",
//     color: "#1a1a1a",
//     fontWeight: 500,
//     fontFamily: "'Inter', sans-serif",
//     fontSize: "14px",
//     border: "1px solid #e6f2f2",
//     borderRadius: "8px",
//     padding: "6px 16px",
//     transition: "all 0.2s ease-in-out",
//     "&:hover, &:focus": {
//       backgroundColor: "#f8fafa",
//       borderColor: "#2d7a7a",
//       color: "#1e5a5a",
//       transform: "translateY(-1px)",
//       boxShadow: "0 4px 12px rgba(45, 122, 122, 0.15)",
//     },
//     "&:active": {
//       backgroundColor: "#fcfefe",
//       borderColor: "#1e5a5a",
//       transform: "translateY(0)",
//       boxShadow: "0 2px 6px rgba(45, 122, 122, 0.2)",
//     },
//     "& .MuiChip-icon": {
//       color: "#2d7a7a",
//       fontSize: "18px",
//       marginLeft: "2px",
//       marginRight: "8px",
//       filter: "drop-shadow(0 1px 2px rgba(45, 122, 122, 0.2))",
//     },
//     "& .MuiChip-label": {
//       paddingLeft: "8px",
//       paddingRight: "8px",
//       fontFamily: "'Inter', sans-serif",
//       fontWeight: 500,
//       fontSize: "14px",
//       lineHeight: 1.4,
//       color: "inherit",
//     },
//     "&.MuiChip-clickable": {
//       cursor: "pointer",
//       "&:hover": {
//         backgroundColor: "#f8fafa",
//         borderColor: "#2d7a7a",
//       },
//     },
//   }
// })

// const StyledBreadcrumbs = styled(Breadcrumbs)({
//   "& .MuiBreadcrumbs-separator": {
//     color: "#6bb6b6",
//     fontSize: "16px",
//     margin: "0 8px",
//     fontWeight: 400,
//     opacity: 0.8,
//   },
//   "& .MuiBreadcrumbs-ol": {
//     alignItems: "center",
//     flexWrap: "wrap",
//   },
// })

// const BreadcrumbContainer = styled("div")({
//   padding: "16px 0",
//   backgroundColor: "#ffffff",
//   borderBottom: "1px solid #e6f2f2",
//   fontFamily: "'Inter', sans-serif",
//   background: "linear-gradient(135deg, #ffffff 0%, #fdfefe 100%)",
// })

// function handleClick(event) {
//   event.preventDefault()
//   console.log("You clicked a breadcrumb.")
// }

// export default function BreadCrumb({ items }) {
//   return (
//     <BreadcrumbContainer role="presentation" onClick={handleClick}>
//       <StyledBreadcrumbs aria-label="breadcrumb">
//         {items.map((item, index) => (
//           <StyledBreadcrumb
//             key={index}
//             component={index === 0 ? "a" : undefined}
//             href={index === 0 ? "/" : item.href}
//             label={item.label}
//             icon={index === 0 && item.label === "Home" ? <HomeIcon fontSize="small" /> : null}
//             clickable={!!item.href}
//           />
//         ))}
//       </StyledBreadcrumbs>
//     </BreadcrumbContainer>
//   )
// }
"use client"

/* eslint-disable react/prop-types */
import HomeIcon from "@mui/icons-material/Home"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Chip from "@mui/material/Chip"
import { styled } from "@mui/material/styles"

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  return {
    backgroundColor: "#ffffff",
    height: "36px",
    color: "#1a1a1a",
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    border: "1px solid #e6f2f2",
    borderRadius: "8px",
    padding: "6px 16px",
    transition: "all 0.2s ease-in-out",
    "&:hover, &:focus": {
      backgroundColor: "#f8fafa",
      borderColor: "#2d7a7a",
      color: "#1e5a5a",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(45, 122, 122, 0.15)",
    },
    "&:active": {
      backgroundColor: "#fcfefe",
      borderColor: "#1e5a5a",
      transform: "translateY(0)",
      boxShadow: "0 2px 6px rgba(45, 122, 122, 0.2)",
    },
    "& .MuiChip-icon": {
      color: "#2d7a7a",
      fontSize: "18px",
      marginLeft: "2px",
      marginRight: "8px",
      filter: "drop-shadow(0 1px 2px rgba(45, 122, 122, 0.2))",
    },
    "& .MuiChip-label": {
      paddingLeft: "8px",
      paddingRight: "8px",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: 1.4,
      color: "inherit",
    },
    "&.MuiChip-clickable": {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f8fafa",
        borderColor: "#2d7a7a",
      },
    },
  }
})

const StyledBreadcrumbs = styled(Breadcrumbs)({
  "& .MuiBreadcrumbs-separator": {
    color: "#6bb6b6",
    fontSize: "16px",
    margin: "0 8px",
    fontWeight: 400,
    opacity: 0.8,
  },
  "& .MuiBreadcrumbs-ol": {
    alignItems: "center",
    flexWrap: "wrap",
  },
})

const BreadcrumbContainer = styled("div")({
  padding: "16px 0",
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e6f2f2",
  fontFamily: "'Inter', sans-serif",
  background: "linear-gradient(135deg, #ffffff 0%, #fdfefe 100%)",
})

function handleClick(event) {
  event.preventDefault()
  console.log("You clicked a breadcrumb.")
}

export default function BreadCrumb({ items }) {
  return (
    <BreadcrumbContainer role="presentation" onClick={handleClick}>
      <StyledBreadcrumbs aria-label="breadcrumb">
        {items.map((item, index) => (
          <StyledBreadcrumb
            key={index}
            component={index === 0 ? "a" : undefined}
            href={index === 0 ? "/" : item.href}
            label={item.label}
            icon={index === 0 && item.label === "Home" ? <HomeIcon fontSize="small" /> : null}
            clickable={!!item.href}
          />
        ))}
      </StyledBreadcrumbs>
    </BreadcrumbContainer>
  )
}