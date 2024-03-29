import Head from 'next/head'
import One from '../windows/One'
import Zero from '../windows/Zero'
import Arrow from '../components/Arrow'


export default function Home() {


  return (
    <>
      <div className='bg-transparent fixed bottom-5 right-10'>
        <Arrow />
      </div>
      <Head>
        <title>Andrea Micheli&#39;s portfolio</title>
        <meta name="description" content="Andrea Micheli's portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='bg-cream_extralight'>

        {/* pagina 0 */}
        <Zero />

        {/* pagina 1 */}
        <One />

        {/* pagina 2 */}
        
        {/* pagina 3 */}
        
        {/* pagina 4 */}
        
        {/* pagina 5 */}
      </div>

    </>
  )
}
