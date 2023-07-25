const VideoSection = (props: any) => {

    const video = {
        height: 'auto',
        paddingTop: '56.25%'
    }

    return (
        <div className="video relative overflow-hidden w-full shadow-lg" style={video}>
            <iframe className="absolute top-0 left-0 w-full h-full" src={props.video.source=='Youtube' ? `https://www.youtube.com/embed/${props.video.video_id}` : `https://player.vimeo.com/video/${props.video.video_id}`} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
    )
}

export default VideoSection