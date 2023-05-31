import Layout from '@/layout'
import React from 'react'

export default function SingleRemiseEpi() {
  return (
    <Layout>SingleRemiseEpi</Layout>
  )
}


export async function getServerSideProps(){
    return {
        props: {}
    }
}