const params = (prms) => {

    try {

        var q = ' '

        for (var i = 0; i < prms.length; i++) {

            q += prms[i]
            q += i < (prms.length - 1) ? ' , ' : ' '

        }

        return q

    } catch (e) {

        console.log(e)
        throw new Error(e.message)

    }

}

const q_select = (prms, t, j, w, g) => {

    try {

        const q_prms = params(prms)
        const q = `
            select ${q_prms} 
            from ${t} 
                ${j ? j : ''} 
                ${w ? w : ''} 
                ${g ? g : ''} ;
        `
        return q

    } catch (e) {

        console.log(e)
        throw new Error(e.message)

    }

}


const q_with = (withs, prms, t, j, w, g) => {

    try {

        var q = ' with '

        for (var i = 0; i < withs.length; i++) {

            q += withs[i].name + ' as ('
            var { prms, t, j, w, g } = withs[i]
            q += q_select(prms, t, j, w, g)
            q += i<(withs.length - 1) ? ' ), ': ' '

        }
        var q_prms = params(prms)
        q += `
            select ${q_prms} 
            from ${t} 
                ${j ? j : ''} 
                ${w ? w : ''} 
                ${g ? g : ''} ;
        `

    } catch (e) {

        console.log(e)
        throw new Error(e.message)

    }

}


export {

    q_select,
    q_with

}
