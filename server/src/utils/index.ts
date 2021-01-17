export function parseName (name: string) {
    return name.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );    
}

export function parseEmail (email: string){
        return email.toLowerCase().replace(/\s/g, '')
}
    
    
    
