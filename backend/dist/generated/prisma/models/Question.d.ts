import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QuestionModel = runtime.Types.Result.DefaultSelection<Prisma.$QuestionPayload>;
export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null;
    _avg: QuestionAvgAggregateOutputType | null;
    _sum: QuestionSumAggregateOutputType | null;
    _min: QuestionMinAggregateOutputType | null;
    _max: QuestionMaxAggregateOutputType | null;
};
export type QuestionAvgAggregateOutputType = {
    id: number | null;
};
export type QuestionSumAggregateOutputType = {
    id: number | null;
};
export type QuestionMinAggregateOutputType = {
    id: number | null;
    question: string | null;
};
export type QuestionMaxAggregateOutputType = {
    id: number | null;
    question: string | null;
};
export type QuestionCountAggregateOutputType = {
    id: number;
    question: number;
    _all: number;
};
export type QuestionAvgAggregateInputType = {
    id?: true;
};
export type QuestionSumAggregateInputType = {
    id?: true;
};
export type QuestionMinAggregateInputType = {
    id?: true;
    question?: true;
};
export type QuestionMaxAggregateInputType = {
    id?: true;
    question?: true;
};
export type QuestionCountAggregateInputType = {
    id?: true;
    question?: true;
    _all?: true;
};
export type QuestionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QuestionCountAggregateInputType;
    _avg?: QuestionAvgAggregateInputType;
    _sum?: QuestionSumAggregateInputType;
    _min?: QuestionMinAggregateInputType;
    _max?: QuestionMaxAggregateInputType;
};
export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
    [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQuestion[P]> : Prisma.GetScalarType<T[P], AggregateQuestion[P]>;
};
export type QuestionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithAggregationInput | Prisma.QuestionOrderByWithAggregationInput[];
    by: Prisma.QuestionScalarFieldEnum[] | Prisma.QuestionScalarFieldEnum;
    having?: Prisma.QuestionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QuestionCountAggregateInputType | true;
    _avg?: QuestionAvgAggregateInputType;
    _sum?: QuestionSumAggregateInputType;
    _min?: QuestionMinAggregateInputType;
    _max?: QuestionMaxAggregateInputType;
};
export type QuestionGroupByOutputType = {
    id: number;
    question: string;
    _count: QuestionCountAggregateOutputType | null;
    _avg: QuestionAvgAggregateOutputType | null;
    _sum: QuestionSumAggregateOutputType | null;
    _min: QuestionMinAggregateOutputType | null;
    _max: QuestionMaxAggregateOutputType | null;
};
export type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QuestionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QuestionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QuestionGroupByOutputType[P]>;
}>>;
export type QuestionWhereInput = {
    AND?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    OR?: Prisma.QuestionWhereInput[];
    NOT?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    id?: Prisma.IntFilter<"Question"> | number;
    question?: Prisma.StringFilter<"Question"> | string;
};
export type QuestionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    question?: Prisma.SortOrder;
};
export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    OR?: Prisma.QuestionWhereInput[];
    NOT?: Prisma.QuestionWhereInput | Prisma.QuestionWhereInput[];
    question?: Prisma.StringFilter<"Question"> | string;
}, "id">;
export type QuestionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    question?: Prisma.SortOrder;
    _count?: Prisma.QuestionCountOrderByAggregateInput;
    _avg?: Prisma.QuestionAvgOrderByAggregateInput;
    _max?: Prisma.QuestionMaxOrderByAggregateInput;
    _min?: Prisma.QuestionMinOrderByAggregateInput;
    _sum?: Prisma.QuestionSumOrderByAggregateInput;
};
export type QuestionScalarWhereWithAggregatesInput = {
    AND?: Prisma.QuestionScalarWhereWithAggregatesInput | Prisma.QuestionScalarWhereWithAggregatesInput[];
    OR?: Prisma.QuestionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QuestionScalarWhereWithAggregatesInput | Prisma.QuestionScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Question"> | number;
    question?: Prisma.StringWithAggregatesFilter<"Question"> | string;
};
export type QuestionCreateInput = {
    question?: string;
};
export type QuestionUncheckedCreateInput = {
    id?: number;
    question?: string;
};
export type QuestionUpdateInput = {
    question?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type QuestionUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    question?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type QuestionCreateManyInput = {
    id?: number;
    question?: string;
};
export type QuestionUpdateManyMutationInput = {
    question?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type QuestionUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    question?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type QuestionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    question?: Prisma.SortOrder;
};
export type QuestionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type QuestionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    question?: Prisma.SortOrder;
};
export type QuestionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    question?: Prisma.SortOrder;
};
export type QuestionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type QuestionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    question?: boolean;
}, ExtArgs["result"]["question"]>;
export type QuestionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    question?: boolean;
}, ExtArgs["result"]["question"]>;
export type QuestionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    question?: boolean;
}, ExtArgs["result"]["question"]>;
export type QuestionSelectScalar = {
    id?: boolean;
    question?: boolean;
};
export type QuestionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "question", ExtArgs["result"]["question"]>;
export type $QuestionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Question";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        question: string;
    }, ExtArgs["result"]["question"]>;
    composites: {};
};
export type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QuestionPayload, S>;
export type QuestionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QuestionCountAggregateInputType | true;
};
export interface QuestionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Question'];
        meta: {
            name: 'Question';
        };
    };
    findUnique<T extends QuestionFindUniqueArgs>(args: Prisma.SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QuestionFindFirstArgs>(args?: Prisma.SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QuestionFindManyArgs>(args?: Prisma.SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QuestionCreateArgs>(args: Prisma.SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QuestionCreateManyArgs>(args?: Prisma.SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QuestionDeleteArgs>(args: Prisma.SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QuestionUpdateArgs>(args: Prisma.SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QuestionDeleteManyArgs>(args?: Prisma.SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QuestionUpdateManyArgs>(args: Prisma.SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QuestionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QuestionUpsertArgs>(args: Prisma.SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QuestionCountArgs>(args?: Prisma.Subset<T, QuestionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QuestionCountAggregateOutputType> : number>;
    aggregate<T extends QuestionAggregateArgs>(args: Prisma.Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>;
    groupBy<T extends QuestionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QuestionGroupByArgs['orderBy'];
    } : {
        orderBy?: QuestionGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QuestionFieldRefs;
}
export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QuestionFieldRefs {
    readonly id: Prisma.FieldRef<"Question", 'Int'>;
    readonly question: Prisma.FieldRef<"Question", 'String'>;
}
export type QuestionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionScalarFieldEnum | Prisma.QuestionScalarFieldEnum[];
};
export type QuestionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionScalarFieldEnum | Prisma.QuestionScalarFieldEnum[];
};
export type QuestionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionScalarFieldEnum | Prisma.QuestionScalarFieldEnum[];
};
export type QuestionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.QuestionCreateInput, Prisma.QuestionUncheckedCreateInput>;
};
export type QuestionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QuestionCreateManyInput | Prisma.QuestionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QuestionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    data: Prisma.QuestionCreateManyInput | Prisma.QuestionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QuestionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionUpdateInput, Prisma.QuestionUncheckedUpdateInput>;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QuestionUpdateManyMutationInput, Prisma.QuestionUncheckedUpdateManyInput>;
    where?: Prisma.QuestionWhereInput;
    limit?: number;
};
export type QuestionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionUpdateManyMutationInput, Prisma.QuestionUncheckedUpdateManyInput>;
    where?: Prisma.QuestionWhereInput;
    limit?: number;
};
export type QuestionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionCreateInput, Prisma.QuestionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QuestionUpdateInput, Prisma.QuestionUncheckedUpdateInput>;
};
export type QuestionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    where: Prisma.QuestionWhereUniqueInput;
};
export type QuestionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionWhereInput;
    limit?: number;
};
export type QuestionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
};
