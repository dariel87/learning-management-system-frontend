import Image from "next/image";

interface LoadingProps {
    is_active: boolean
}

const Loading = ({is_active}: LoadingProps) => {
    return (
        <>
        {is_active &&
            <div className="position-fixed start-0 top-0 w-100 h-100" style={{backgroundColor:'rgba(0, 0, 0, .5)'}}>
                <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                    <div className="text-center">
                        <Image
                            src="/loading.svg"
                            alt="loading"
                            width={50}
                            height={50}
                        />
                        <br />
                        <span className="text-white mt-3 d-block">Loading content...</span>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Loading;