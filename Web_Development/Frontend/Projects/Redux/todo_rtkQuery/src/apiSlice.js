import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => "/tasks",
      transformResponse: (data) => data.reverse(),
      providesTags: ["Tasks"],
    }),
    addData: builder.mutation({
      query: (newData) => ({ url: "/tasks", method: "POST", body: newData }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getData", undefined, (draft) => {
            draft.unshift({...data});
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    updateData: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted({id,...updatedData},{dispatch,queryFulfilled}){
        const patchResult=dispatch(
            api.util.updateQueryData('getData',undefined,(tasklist)=>{
                const taskIndex=tasklist.findIndex(
                    (el)=>el.id===id
                )
                tasklist[taskIndex]={...tasklist[taskIndex],...updatedData}
            })
        )
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      }
    }),
    deleteData: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/tasks/${id}`,
      }),
      invalidatesTags: ["Tasks"],
      async onQueryStarted(id,{dispatch,queryFulfilled}){
        const patchResult=dispatch(
            api.util.updateQueryData('getData',undefined,(tasklist)=>{
                const taskIndex=tasklist.findIndex(
                    (el)=>el.id===id
                )
                tasklist.splice(taskIndex,1)
            }))
            try {
                await queryFulfilled
            } catch (error) {
                patchResult.undo()
            }
      }
      
    }),
  }),
});

export const {
  useGetDataQuery,
  useAddDataMutation,
  useUpdateDataMutation,
  useDeleteDataMutation,
} = api;

export default api;
