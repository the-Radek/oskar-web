'use client';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { MenuPaginationProps } from './menu-pagination.types';
import { useId, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';

export default function MenuPagination(props: MenuPaginationProps) {
  const { pages, current, label } = props;

  const id = useId();
  const buttonId = `button-${id}`;
  const menuId = `menu-${id}`;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonGroup variant="text">
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Button
          id={buttonId}
          aria-controls={open ? menuId : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {label ?? pages[current].label}
        </Button>
        <IconButton>
          <ArrowForwardIcon />
        </IconButton>
      </ButtonGroup>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': buttonId,
          },
        }}
      >
        {pages.map((page, index) => (
          <MenuItem key={index} selected={index === current} onClick={handleClose}>
            {page.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
