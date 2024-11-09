import "../../styles/card.css"

export default function Card({width, height, childrenTop, childrenBottom}) {
    
    const styles = {
        box:{
            width: width,
            height: height
        }
    }

    return (
        <div className="box" style={styles.box}>
            <div className="top">
                {childrenTop}
            </div>
            <div className="Bottom">
                {childrenBottom}
            </div>
        </div>
    )

}