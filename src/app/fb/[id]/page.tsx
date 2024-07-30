import Insight from './insight'

const PublicFbPage = async ({ params }: { params: { id: string } }) => {
  return (
    <main className='flex items-center justify-center min-h-screen py-12'>
      <Insight pageId={params.id} />
    </main>
  )
}
export default PublicFbPage
