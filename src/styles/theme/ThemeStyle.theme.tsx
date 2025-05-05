// This file should primarily contain module augmentations and shared theme constants/enums.
// The actual theme creation is now handled dynamically in App.tsx.

// Keep enums or constants if they are used elsewhere (like in App.tsx)
export enum OptionsDatepicker {
  Margin = 'margin',
  Field = 'field',
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    link: true;
    linkDark: true;
    home: true;
    outlinedDark: true;
    underline: true;
    upload: true;
    roundDetails: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonVariantOverrides {
    roundDetail: true;
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    player: true;
    roundHead: true;
    clubs: true;
    clubsHeader: true;
    clubsLoft: true;
    disabled: true;
    light: true;
    dialog: true;
    uploadFileDialog: true;
    confirm: true;
    service: true;
    payment: true;
    card: true;
  }
}

declare module '@mui/material/Grid' {
  interface GridPropsVariantOverrides {
    club: true;
  }
}
declare module '@mui/material/Box' {
  interface BoxPropsVariantOverrides {
    test: true;
    clubsContainer: true;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    datepicker: string;
  }

  interface ThemeOptions {
    datepicker: string;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsVariantOverrides {
    eye: true;
  }

  interface TextFieldPropsVariantsOptions {
    eye: string;
  }
}

declare module '@mui/material/TableCell' {
  interface TableCellPropsVariantOverrides {
    red: true;
    yellow: true;
    green: true;
    putt: true;
  }
}
