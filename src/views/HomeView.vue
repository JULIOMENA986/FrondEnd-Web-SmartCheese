<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card">
					<div class="card-header">Dashboard</div>

					<div class="card-body">
						<div class="alert alert-success" role="alert">
							Bienvenido!
						</div>
						<input type="hidden" v-model="user.id">
						
						<br>

						<a type="button" class="btn btn-outline-danger" @click="logout">Log Out</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import store from '@/store';

export default {
	name: 'HomeView',
	data() {
		return {
			user: {
				id: null
			}
		};
	},
	mounted() {
	},
	methods: {
		async logout() {
			try {
				const token = store.state.token;

				const response = await axios.post('http://127.0.0.1:3333/api/logout', {
					'Content-Type': 'application/json',
				},
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				});
				
				console.log(response.data)
				localStorage.removeItem('token');
				this.$router.push('/login');
			} 
        catch (error) {
				console.error(error);
				alert('Error. Verifique sus credenciales');
			}
		}
	},
};
</script>
<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
</style>