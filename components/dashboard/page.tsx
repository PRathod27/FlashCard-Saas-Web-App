import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs'
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'
import React from 'react'

const page = () => {
  return (
    <Container maxWidth='100vw' sx={{ marginLeft: '0', marginRight: '0' }}>
        <Head>
            <title>FlashCard SaaS</title>
            <meta name = 'description' content = 'Create FlashCard SaaS' />
        </Head>

        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' style={{flexGrow:1}}>FlashCard SaaS</Typography>
                <SignedOut>
                    <Button color='inherit'>Login</Button>
                    <Button color='inherit'>SignUp</Button>
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </Toolbar>
        </AppBar>
    </Container>
  )
}

export default page