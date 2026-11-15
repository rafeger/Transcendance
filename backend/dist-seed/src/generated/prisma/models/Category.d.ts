import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CategoryModel = runtime.Types.Result.DefaultSelection<Prisma.$CategoryPayload>;
export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null;
    _avg: CategoryAvgAggregateOutputType | null;
    _sum: CategorySumAggregateOutputType | null;
    _min: CategoryMinAggregateOutputType | null;
    _max: CategoryMaxAggregateOutputType | null;
};
export type CategoryAvgAggregateOutputType = {
    id: number | null;
    opentdbId: number | null;
};
export type CategorySumAggregateOutputType = {
    id: number | null;
    opentdbId: number | null;
};
export type CategoryMinAggregateOutputType = {
    id: number | null;
    opentdbId: number | null;
    name: string | null;
};
export type CategoryMaxAggregateOutputType = {
    id: number | null;
    opentdbId: number | null;
    name: string | null;
};
export type CategoryCountAggregateOutputType = {
    id: number;
    opentdbId: number;
    name: number;
    _all: number;
};
export type CategoryAvgAggregateInputType = {
    id?: true;
    opentdbId?: true;
};
export type CategorySumAggregateInputType = {
    id?: true;
    opentdbId?: true;
};
export type CategoryMinAggregateInputType = {
    id?: true;
    opentdbId?: true;
    name?: true;
};
export type CategoryMaxAggregateInputType = {
    id?: true;
    opentdbId?: true;
    name?: true;
};
export type CategoryCountAggregateInputType = {
    id?: true;
    opentdbId?: true;
    name?: true;
    _all?: true;
};
export type CategoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[];
    cursor?: Prisma.CategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CategoryCountAggregateInputType;
    _avg?: CategoryAvgAggregateInputType;
    _sum?: CategorySumAggregateInputType;
    _min?: CategoryMinAggregateInputType;
    _max?: CategoryMaxAggregateInputType;
};
export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCategory[P]> : Prisma.GetScalarType<T[P], AggregateCategory[P]>;
};
export type CategoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithAggregationInput | Prisma.CategoryOrderByWithAggregationInput[];
    by: Prisma.CategoryScalarFieldEnum[] | Prisma.CategoryScalarFieldEnum;
    having?: Prisma.CategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CategoryCountAggregateInputType | true;
    _avg?: CategoryAvgAggregateInputType;
    _sum?: CategorySumAggregateInputType;
    _min?: CategoryMinAggregateInputType;
    _max?: CategoryMaxAggregateInputType;
};
export type CategoryGroupByOutputType = {
    id: number;
    opentdbId: number;
    name: string;
    _count: CategoryCountAggregateOutputType | null;
    _avg: CategoryAvgAggregateOutputType | null;
    _sum: CategorySumAggregateOutputType | null;
    _min: CategoryMinAggregateOutputType | null;
    _max: CategoryMaxAggregateOutputType | null;
};
export type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CategoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CategoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CategoryGroupByOutputType[P]>;
}>>;
export type CategoryWhereInput = {
    AND?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[];
    OR?: Prisma.CategoryWhereInput[];
    NOT?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[];
    id?: Prisma.IntFilter<"Category"> | number;
    opentdbId?: Prisma.IntFilter<"Category"> | number;
    name?: Prisma.StringFilter<"Category"> | string;
    quizzes?: Prisma.QuizListRelationFilter;
    questions?: Prisma.QuestionListRelationFilter;
};
export type CategoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    opentdbId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    quizzes?: Prisma.QuizOrderByRelationAggregateInput;
    questions?: Prisma.QuestionOrderByRelationAggregateInput;
};
export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    opentdbId?: number;
    name?: string;
    AND?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[];
    OR?: Prisma.CategoryWhereInput[];
    NOT?: Prisma.CategoryWhereInput | Prisma.CategoryWhereInput[];
    quizzes?: Prisma.QuizListRelationFilter;
    questions?: Prisma.QuestionListRelationFilter;
}, "id" | "opentdbId" | "name">;
export type CategoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    opentdbId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    _count?: Prisma.CategoryCountOrderByAggregateInput;
    _avg?: Prisma.CategoryAvgOrderByAggregateInput;
    _max?: Prisma.CategoryMaxOrderByAggregateInput;
    _min?: Prisma.CategoryMinOrderByAggregateInput;
    _sum?: Prisma.CategorySumOrderByAggregateInput;
};
export type CategoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.CategoryScalarWhereWithAggregatesInput | Prisma.CategoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.CategoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CategoryScalarWhereWithAggregatesInput | Prisma.CategoryScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Category"> | number;
    opentdbId?: Prisma.IntWithAggregatesFilter<"Category"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Category"> | string;
};
export type CategoryCreateInput = {
    opentdbId: number;
    name: string;
    quizzes?: Prisma.QuizCreateNestedManyWithoutCategoryInput;
    questions?: Prisma.QuestionCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateInput = {
    id?: number;
    opentdbId: number;
    name: string;
    quizzes?: Prisma.QuizUncheckedCreateNestedManyWithoutCategoryInput;
    questions?: Prisma.QuestionUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryUpdateInput = {
    opentdbId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    quizzes?: Prisma.QuizUpdateManyWithoutCategoryNestedInput;
    questions?: Prisma.QuestionUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    opentdbId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    quizzes?: Prisma.QuizUncheckedUpdateManyWithoutCategoryNestedInput;
    questions?: Prisma.QuestionUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryCreateManyInput = {
    id?: number;
    opentdbId: number;
    name: string;
};
export type CategoryUpdateManyMutationInput = {
    opentdbId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type CategoryUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    opentdbId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type CategoryScalarRelationFilter = {
    is?: Prisma.CategoryWhereInput;
    isNot?: Prisma.CategoryWhereInput;
};
export type CategoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    opentdbId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type CategoryAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    opentdbId?: Prisma.SortOrder;
};
export type CategoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    opentdbId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type CategoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    opentdbId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type CategorySumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    opentdbId?: Prisma.SortOrder;
};
export type CategoryCreateNestedOneWithoutQuizzesInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutQuizzesInput, Prisma.CategoryUncheckedCreateWithoutQuizzesInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutQuizzesInput;
    connect?: Prisma.CategoryWhereUniqueInput;
};
export type CategoryUpdateOneRequiredWithoutQuizzesNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutQuizzesInput, Prisma.CategoryUncheckedCreateWithoutQuizzesInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutQuizzesInput;
    upsert?: Prisma.CategoryUpsertWithoutQuizzesInput;
    connect?: Prisma.CategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CategoryUpdateToOneWithWhereWithoutQuizzesInput, Prisma.CategoryUpdateWithoutQuizzesInput>, Prisma.CategoryUncheckedUpdateWithoutQuizzesInput>;
};
export type CategoryCreateNestedOneWithoutQuestionsInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutQuestionsInput, Prisma.CategoryUncheckedCreateWithoutQuestionsInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutQuestionsInput;
    connect?: Prisma.CategoryWhereUniqueInput;
};
export type CategoryUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryCreateWithoutQuestionsInput, Prisma.CategoryUncheckedCreateWithoutQuestionsInput>;
    connectOrCreate?: Prisma.CategoryCreateOrConnectWithoutQuestionsInput;
    upsert?: Prisma.CategoryUpsertWithoutQuestionsInput;
    connect?: Prisma.CategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CategoryUpdateToOneWithWhereWithoutQuestionsInput, Prisma.CategoryUpdateWithoutQuestionsInput>, Prisma.CategoryUncheckedUpdateWithoutQuestionsInput>;
};
export type CategoryCreateWithoutQuizzesInput = {
    opentdbId: number;
    name: string;
    questions?: Prisma.QuestionCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutQuizzesInput = {
    id?: number;
    opentdbId: number;
    name: string;
    questions?: Prisma.QuestionUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutQuizzesInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutQuizzesInput, Prisma.CategoryUncheckedCreateWithoutQuizzesInput>;
};
export type CategoryUpsertWithoutQuizzesInput = {
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutQuizzesInput, Prisma.CategoryUncheckedUpdateWithoutQuizzesInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutQuizzesInput, Prisma.CategoryUncheckedCreateWithoutQuizzesInput>;
    where?: Prisma.CategoryWhereInput;
};
export type CategoryUpdateToOneWithWhereWithoutQuizzesInput = {
    where?: Prisma.CategoryWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutQuizzesInput, Prisma.CategoryUncheckedUpdateWithoutQuizzesInput>;
};
export type CategoryUpdateWithoutQuizzesInput = {
    opentdbId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.QuestionUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutQuizzesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    opentdbId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.QuestionUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryCreateWithoutQuestionsInput = {
    opentdbId: number;
    name: string;
    quizzes?: Prisma.QuizCreateNestedManyWithoutCategoryInput;
};
export type CategoryUncheckedCreateWithoutQuestionsInput = {
    id?: number;
    opentdbId: number;
    name: string;
    quizzes?: Prisma.QuizUncheckedCreateNestedManyWithoutCategoryInput;
};
export type CategoryCreateOrConnectWithoutQuestionsInput = {
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutQuestionsInput, Prisma.CategoryUncheckedCreateWithoutQuestionsInput>;
};
export type CategoryUpsertWithoutQuestionsInput = {
    update: Prisma.XOR<Prisma.CategoryUpdateWithoutQuestionsInput, Prisma.CategoryUncheckedUpdateWithoutQuestionsInput>;
    create: Prisma.XOR<Prisma.CategoryCreateWithoutQuestionsInput, Prisma.CategoryUncheckedCreateWithoutQuestionsInput>;
    where?: Prisma.CategoryWhereInput;
};
export type CategoryUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: Prisma.CategoryWhereInput;
    data: Prisma.XOR<Prisma.CategoryUpdateWithoutQuestionsInput, Prisma.CategoryUncheckedUpdateWithoutQuestionsInput>;
};
export type CategoryUpdateWithoutQuestionsInput = {
    opentdbId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    quizzes?: Prisma.QuizUpdateManyWithoutCategoryNestedInput;
};
export type CategoryUncheckedUpdateWithoutQuestionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    opentdbId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    quizzes?: Prisma.QuizUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type CategoryCountOutputType = {
    quizzes: number;
    questions: number;
};
export type CategoryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    quizzes?: boolean | CategoryCountOutputTypeCountQuizzesArgs;
    questions?: boolean | CategoryCountOutputTypeCountQuestionsArgs;
};
export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategoryCountOutputTypeSelect<ExtArgs> | null;
};
export type CategoryCountOutputTypeCountQuizzesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuizWhereInput;
};
export type CategoryCountOutputTypeCountQuestionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionWhereInput;
};
export type CategorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    opentdbId?: boolean;
    name?: boolean;
    quizzes?: boolean | Prisma.Category$quizzesArgs<ExtArgs>;
    questions?: boolean | Prisma.Category$questionsArgs<ExtArgs>;
    _count?: boolean | Prisma.CategoryCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["category"]>;
export type CategorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    opentdbId?: boolean;
    name?: boolean;
}, ExtArgs["result"]["category"]>;
export type CategorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    opentdbId?: boolean;
    name?: boolean;
}, ExtArgs["result"]["category"]>;
export type CategorySelectScalar = {
    id?: boolean;
    opentdbId?: boolean;
    name?: boolean;
};
export type CategoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "opentdbId" | "name", ExtArgs["result"]["category"]>;
export type CategoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    quizzes?: boolean | Prisma.Category$quizzesArgs<ExtArgs>;
    questions?: boolean | Prisma.Category$questionsArgs<ExtArgs>;
    _count?: boolean | Prisma.CategoryCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CategoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $CategoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Category";
    objects: {
        quizzes: Prisma.$QuizPayload<ExtArgs>[];
        questions: Prisma.$QuestionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        opentdbId: number;
        name: string;
    }, ExtArgs["result"]["category"]>;
    composites: {};
};
export type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CategoryPayload, S>;
export type CategoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CategoryCountAggregateInputType | true;
};
export interface CategoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Category'];
        meta: {
            name: 'Category';
        };
    };
    findUnique<T extends CategoryFindUniqueArgs>(args: Prisma.SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CategoryFindFirstArgs>(args?: Prisma.SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CategoryFindManyArgs>(args?: Prisma.SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CategoryCreateArgs>(args: Prisma.SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CategoryCreateManyArgs>(args?: Prisma.SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CategoryDeleteArgs>(args: Prisma.SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CategoryUpdateArgs>(args: Prisma.SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CategoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CategoryUpdateManyArgs>(args: Prisma.SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CategoryUpsertArgs>(args: Prisma.SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CategoryCountArgs>(args?: Prisma.Subset<T, CategoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CategoryCountAggregateOutputType> : number>;
    aggregate<T extends CategoryAggregateArgs>(args: Prisma.Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>;
    groupBy<T extends CategoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CategoryGroupByArgs['orderBy'];
    } : {
        orderBy?: CategoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CategoryFieldRefs;
}
export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    quizzes<T extends Prisma.Category$quizzesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$quizzesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    questions<T extends Prisma.Category$questionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Category$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CategoryFieldRefs {
    readonly id: Prisma.FieldRef<"Category", 'Int'>;
    readonly opentdbId: Prisma.FieldRef<"Category", 'Int'>;
    readonly name: Prisma.FieldRef<"Category", 'String'>;
}
export type CategoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
};
export type CategoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
};
export type CategoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[];
    cursor?: Prisma.CategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CategoryScalarFieldEnum | Prisma.CategoryScalarFieldEnum[];
};
export type CategoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[];
    cursor?: Prisma.CategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CategoryScalarFieldEnum | Prisma.CategoryScalarFieldEnum[];
};
export type CategoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[];
    cursor?: Prisma.CategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CategoryScalarFieldEnum | Prisma.CategoryScalarFieldEnum[];
};
export type CategoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CategoryCreateInput, Prisma.CategoryUncheckedCreateInput>;
};
export type CategoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CategoryCreateManyInput | Prisma.CategoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CategoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    data: Prisma.CategoryCreateManyInput | Prisma.CategoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CategoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CategoryUpdateInput, Prisma.CategoryUncheckedUpdateInput>;
    where: Prisma.CategoryWhereUniqueInput;
};
export type CategoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CategoryUpdateManyMutationInput, Prisma.CategoryUncheckedUpdateManyInput>;
    where?: Prisma.CategoryWhereInput;
    limit?: number;
};
export type CategoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CategoryUpdateManyMutationInput, Prisma.CategoryUncheckedUpdateManyInput>;
    where?: Prisma.CategoryWhereInput;
    limit?: number;
};
export type CategoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryCreateInput, Prisma.CategoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CategoryUpdateInput, Prisma.CategoryUncheckedUpdateInput>;
};
export type CategoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where: Prisma.CategoryWhereUniqueInput;
};
export type CategoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput;
    limit?: number;
};
export type Category$quizzesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizSelect<ExtArgs> | null;
    omit?: Prisma.QuizOmit<ExtArgs> | null;
    include?: Prisma.QuizInclude<ExtArgs> | null;
    where?: Prisma.QuizWhereInput;
    orderBy?: Prisma.QuizOrderByWithRelationInput | Prisma.QuizOrderByWithRelationInput[];
    cursor?: Prisma.QuizWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuizScalarFieldEnum | Prisma.QuizScalarFieldEnum[];
};
export type Category$questionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuestionOmit<ExtArgs> | null;
    include?: Prisma.QuestionInclude<ExtArgs> | null;
    where?: Prisma.QuestionWhereInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput | Prisma.QuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionScalarFieldEnum | Prisma.QuestionScalarFieldEnum[];
};
export type CategoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
};
