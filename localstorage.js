export default function useLocalStorage() {
    const scores = localStorage.getItem("scores");

    if(scores){
        return JSON.parse(scores)
    } else {
        return {
            easy: 0,
            medium: 0,
            hard: 0,
            insane: 0
        }
    }
}
