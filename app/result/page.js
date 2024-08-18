'use client'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getStripe from "@/utils/get-stripe";
import { useSearchParams } from "next/navigation";
import { Container } from "postcss";
import { CircularProgress, Typography } from "@mui/material";

const ResultPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const session_id = searchParams.get('session_id');
    
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if(!session_id) return 

            try{
                const res = await fetch(`/api/checkout_sessions?session_id=${session_id}`)
                const sessionData = await res.json()
                if(res.ok) {
                    setSession(sessionData)
                }else{
                    setError(sessionData.error)
                }
                
            }
            catch{
                setError({message: 'An error occurred while fetching the checkout session.'})
            }
            finally{
                setLoading(false)
            }
        }

        fetchCheckoutSession()
    }, [session_id])

    if(loading){
        return(
            <Container sx={{maxWidth : '100vw',
                textAligb: 'center', mt:4
            }}>
                <CircularProgress/>
                <Typography variant="h6">Loading...</Typography>
            </Container>
        )
    }

    if(error){
        return(
            <Container sx={{maxWidth : '100vw',
                textAligb: 'center', mt:4
            }}>
                <Typography variant="h6">{error}</Typography>
            </Container>
        )
    }

    return(
        <Container sx={{maxWidth : '100vw',
            textAligb: 'center', mt:4
        }}>
            {
                session.payment_status === "paid" ? (
                    <>
                        <Typography variant="h4">Thank you for purchasing</Typography>
                        <Box sx={{mt:22}}>
                            <Typography variant="h6">Session id: {session_id}</Typography>
                            <Typography variant="body1">
                                We have received your payment and You Will recieve an email with the order details shortly.
                            </Typography>
                        </Box>
                    </>
                ):
                (
                <>
                    <Typography variant="h4">Payment Failed</Typography>
                    <Box sx={{mt:22}}>
                        <Typography variant="body1">
                            Your payment was unsuccessful. Please try again.
                        </Typography>
                    </Box>
                </>
                )
            }
        </Container>
    )
}