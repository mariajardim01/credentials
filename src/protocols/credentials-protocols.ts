export type PostCredentialsType = {
    title: string,
	url: string,
	username: string,
	password: string
}

export type CredentialsOnDBType = PostCredentialsType & {
    id : number,
    userId: number
}




