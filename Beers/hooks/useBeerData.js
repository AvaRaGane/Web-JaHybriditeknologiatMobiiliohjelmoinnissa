import { useEffect, useState } from 'react';
const url = 'https://random-data-api.com/api/v2/beers'

const useBeerData = () => {
    const [brand, setBrand] = useState('')
    const [name, setName] = useState('')
    const [style, setStyle] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        getBeerData()
      }, [])
      
    const getBeerData = async () => {
        setLoading(true)
        try {
          const response = await fetch(url)
          if (response.ok){
            const json = await response.json()
            setBrand(json.brand)
            setName(json.name)
            setStyle(json.style)
          } else {
            if (response.status === 429){
              setError("Too many requests")
            } else {
              setError("Can't retieve beer information!")
            }
          }
        } catch (error) {
          setError(error.message)
        }
        setLoading(false)
    }
    return {brand, name, style, loading, error, getBeerData}
}

export default useBeerData