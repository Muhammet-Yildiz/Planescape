import { Link as RouterLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Avatar,
  Box,
  Popover,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { usePopover } from '../hooks/use-popover';
import { FaUser } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FC } from 'react';
import { AiFillRead } from "react-icons/ai";

export const AccountPopover: FC = () => {
  const navigate = useNavigate();
  const [anchorRef, open, handleOpen, handleClose] = usePopover();


  const handleLogout = async () => {
    try {
      handleClose();
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <Box
        onClick={handleOpen}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          cursor: 'pointer',
          display: 'flex',
          ml: 1.5,
          gap: 0.4
        }}
      >
        <Avatar
          src="/user-joane_smith.png"
          variant="rounded"
          sx={{
            height: 29,
            width: 29
          }}
        />
        <Box
          sx={{
            alignItems: 'center',
            display: {
              md: 'flex',
              xs: 'none'
            },
            flex: 1,
            ml: 1,
            minWidth: 115,
            gap: 1.2,
            '& .MuiTypography-root': {
              fontSize: 11.3
            }
          }}
        >
          <ListItemText
            primary="Joane Smith"
            secondary="joane@gmail.com"
            primaryTypographyProps={{
              sx: { fontSize: '0.745rem !important', fontWeight: 500 }
            }}
            secondaryTypographyProps={{
              sx: { fontSize: '0.61rem !important' }
            }}
          />
          <IoChevronDown />
        </Box>
      </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        sx={{
          top: 10,
          left: { md: '-2rem', lg: '-5rem' }
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            width: 245,
            display: 'flex',
            flexDirection: 'column',
            '& .MuiListItem-root': {
              px: 1.8,
              py: 3.2,
              height: 40,
            },
            '& .MuiListItemIcon-root svg': {
              width: 18,
              height: 18,
              ml: 1
            },
            '& .MuiListItem-root:not(:last-of-type)': {
              borderBottom: '1px solid rgba(0,0,0,0.05)'
            },

          }
        }}
      >

        <List>
          <ListItem sx={{ bgcolor: '#f5edfc' }} >
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                src="/user-joane_smith.png"
                sx={{ height: 32, width: 32 }}
              />
            </ListItemAvatar>

            <ListItemText
              primary="Joane Smith"
              secondary="joane@gmail.com"

            />
          </ListItem>

          <ListItem
            component={RouterLink}
            onClick={handleClose}
            to="#"
          >
            <ListItemIcon>
              <FaUser />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem
            component={RouterLink}
            onClick={handleClose}
            to="/bookings"
          >
            <ListItemIcon>
              <AiFillRead />
            </ListItemIcon>
            <ListItemText primary="My Bookings" />
          </ListItem>
          <ListItem
            onClick={() => { }}
            component={RouterLink}
            to="#"
          >
            <ListItemIcon>
              <FiLogOut />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </Popover>
    </>
  );
};