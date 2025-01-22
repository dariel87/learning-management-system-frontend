import { useRouter } from 'next/router'

export default function Show() {
    const router = useRouter();
    const { id } = router.query

    return <div>Show user detail: { id }</div>
}