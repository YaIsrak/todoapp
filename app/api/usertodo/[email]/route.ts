import { fetchUserTodos } from '@/lib/actions/user.action';

export async function GET(
	req: Request,
	{ params }: { params: { email: string } }
) {
	const user = await fetchUserTodos(params.email);

	return Response.json(user);
}
