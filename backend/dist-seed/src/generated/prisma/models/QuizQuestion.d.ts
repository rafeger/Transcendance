import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QuizQuestionModel = runtime.Types.Result.DefaultSelection<Prisma.$QuizQuestionPayload>;
export type AggregateQuizQuestion = {
    _count: QuizQuestionCountAggregateOutputType | null;
    _avg: QuizQuestionAvgAggregateOutputType | null;
    _sum: QuizQuestionSumAggregateOutputType | null;
    _min: QuizQuestionMinAggregateOutputType | null;
    _max: QuizQuestionMaxAggregateOutputType | null;
};
export type QuizQuestionAvgAggregateOutputType = {
    quizId: number | null;
    questionId: number | null;
    position: number | null;
};
export type QuizQuestionSumAggregateOutputType = {
    quizId: number | null;
    questionId: number | null;
    position: number | null;
};
export type QuizQuestionMinAggregateOutputType = {
    quizId: number | null;
    questionId: number | null;
    position: number | null;
};
export type QuizQuestionMaxAggregateOutputType = {
    quizId: number | null;
    questionId: number | null;
    position: number | null;
};
export type QuizQuestionCountAggregateOutputType = {
    quizId: number;
    questionId: number;
    position: number;
    _all: number;
};
export type QuizQuestionAvgAggregateInputType = {
    quizId?: true;
    questionId?: true;
    position?: true;
};
export type QuizQuestionSumAggregateInputType = {
    quizId?: true;
    questionId?: true;
    position?: true;
};
export type QuizQuestionMinAggregateInputType = {
    quizId?: true;
    questionId?: true;
    position?: true;
};
export type QuizQuestionMaxAggregateInputType = {
    quizId?: true;
    questionId?: true;
    position?: true;
};
export type QuizQuestionCountAggregateInputType = {
    quizId?: true;
    questionId?: true;
    position?: true;
    _all?: true;
};
export type QuizQuestionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuizQuestionWhereInput;
    orderBy?: Prisma.QuizQuestionOrderByWithRelationInput | Prisma.QuizQuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuizQuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QuizQuestionCountAggregateInputType;
    _avg?: QuizQuestionAvgAggregateInputType;
    _sum?: QuizQuestionSumAggregateInputType;
    _min?: QuizQuestionMinAggregateInputType;
    _max?: QuizQuestionMaxAggregateInputType;
};
export type GetQuizQuestionAggregateType<T extends QuizQuestionAggregateArgs> = {
    [P in keyof T & keyof AggregateQuizQuestion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQuizQuestion[P]> : Prisma.GetScalarType<T[P], AggregateQuizQuestion[P]>;
};
export type QuizQuestionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuizQuestionWhereInput;
    orderBy?: Prisma.QuizQuestionOrderByWithAggregationInput | Prisma.QuizQuestionOrderByWithAggregationInput[];
    by: Prisma.QuizQuestionScalarFieldEnum[] | Prisma.QuizQuestionScalarFieldEnum;
    having?: Prisma.QuizQuestionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QuizQuestionCountAggregateInputType | true;
    _avg?: QuizQuestionAvgAggregateInputType;
    _sum?: QuizQuestionSumAggregateInputType;
    _min?: QuizQuestionMinAggregateInputType;
    _max?: QuizQuestionMaxAggregateInputType;
};
export type QuizQuestionGroupByOutputType = {
    quizId: number;
    questionId: number;
    position: number;
    _count: QuizQuestionCountAggregateOutputType | null;
    _avg: QuizQuestionAvgAggregateOutputType | null;
    _sum: QuizQuestionSumAggregateOutputType | null;
    _min: QuizQuestionMinAggregateOutputType | null;
    _max: QuizQuestionMaxAggregateOutputType | null;
};
export type GetQuizQuestionGroupByPayload<T extends QuizQuestionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QuizQuestionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QuizQuestionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QuizQuestionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QuizQuestionGroupByOutputType[P]>;
}>>;
export type QuizQuestionWhereInput = {
    AND?: Prisma.QuizQuestionWhereInput | Prisma.QuizQuestionWhereInput[];
    OR?: Prisma.QuizQuestionWhereInput[];
    NOT?: Prisma.QuizQuestionWhereInput | Prisma.QuizQuestionWhereInput[];
    quizId?: Prisma.IntFilter<"QuizQuestion"> | number;
    questionId?: Prisma.IntFilter<"QuizQuestion"> | number;
    position?: Prisma.IntFilter<"QuizQuestion"> | number;
    quiz?: Prisma.XOR<Prisma.QuizScalarRelationFilter, Prisma.QuizWhereInput>;
    question?: Prisma.XOR<Prisma.QuestionScalarRelationFilter, Prisma.QuestionWhereInput>;
};
export type QuizQuestionOrderByWithRelationInput = {
    quizId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    quiz?: Prisma.QuizOrderByWithRelationInput;
    question?: Prisma.QuestionOrderByWithRelationInput;
};
export type QuizQuestionWhereUniqueInput = Prisma.AtLeast<{
    quizId_position?: Prisma.QuizQuestionQuizIdPositionCompoundUniqueInput;
    quizId_questionId?: Prisma.QuizQuestionQuizIdQuestionIdCompoundUniqueInput;
    AND?: Prisma.QuizQuestionWhereInput | Prisma.QuizQuestionWhereInput[];
    OR?: Prisma.QuizQuestionWhereInput[];
    NOT?: Prisma.QuizQuestionWhereInput | Prisma.QuizQuestionWhereInput[];
    quizId?: Prisma.IntFilter<"QuizQuestion"> | number;
    questionId?: Prisma.IntFilter<"QuizQuestion"> | number;
    position?: Prisma.IntFilter<"QuizQuestion"> | number;
    quiz?: Prisma.XOR<Prisma.QuizScalarRelationFilter, Prisma.QuizWhereInput>;
    question?: Prisma.XOR<Prisma.QuestionScalarRelationFilter, Prisma.QuestionWhereInput>;
}, "quizId_questionId" | "quizId_position">;
export type QuizQuestionOrderByWithAggregationInput = {
    quizId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    _count?: Prisma.QuizQuestionCountOrderByAggregateInput;
    _avg?: Prisma.QuizQuestionAvgOrderByAggregateInput;
    _max?: Prisma.QuizQuestionMaxOrderByAggregateInput;
    _min?: Prisma.QuizQuestionMinOrderByAggregateInput;
    _sum?: Prisma.QuizQuestionSumOrderByAggregateInput;
};
export type QuizQuestionScalarWhereWithAggregatesInput = {
    AND?: Prisma.QuizQuestionScalarWhereWithAggregatesInput | Prisma.QuizQuestionScalarWhereWithAggregatesInput[];
    OR?: Prisma.QuizQuestionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QuizQuestionScalarWhereWithAggregatesInput | Prisma.QuizQuestionScalarWhereWithAggregatesInput[];
    quizId?: Prisma.IntWithAggregatesFilter<"QuizQuestion"> | number;
    questionId?: Prisma.IntWithAggregatesFilter<"QuizQuestion"> | number;
    position?: Prisma.IntWithAggregatesFilter<"QuizQuestion"> | number;
};
export type QuizQuestionCreateInput = {
    position: number;
    quiz: Prisma.QuizCreateNestedOneWithoutQuestionsInput;
    question: Prisma.QuestionCreateNestedOneWithoutQuizzesInput;
};
export type QuizQuestionUncheckedCreateInput = {
    quizId: number;
    questionId: number;
    position: number;
};
export type QuizQuestionUpdateInput = {
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    quiz?: Prisma.QuizUpdateOneRequiredWithoutQuestionsNestedInput;
    question?: Prisma.QuestionUpdateOneRequiredWithoutQuizzesNestedInput;
};
export type QuizQuestionUncheckedUpdateInput = {
    quizId?: Prisma.IntFieldUpdateOperationsInput | number;
    questionId?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type QuizQuestionCreateManyInput = {
    quizId: number;
    questionId: number;
    position: number;
};
export type QuizQuestionUpdateManyMutationInput = {
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type QuizQuestionUncheckedUpdateManyInput = {
    quizId?: Prisma.IntFieldUpdateOperationsInput | number;
    questionId?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type QuizQuestionListRelationFilter = {
    every?: Prisma.QuizQuestionWhereInput;
    some?: Prisma.QuizQuestionWhereInput;
    none?: Prisma.QuizQuestionWhereInput;
};
export type QuizQuestionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type QuizQuestionQuizIdPositionCompoundUniqueInput = {
    quizId: number;
    position: number;
};
export type QuizQuestionQuizIdQuestionIdCompoundUniqueInput = {
    quizId: number;
    questionId: number;
};
export type QuizQuestionCountOrderByAggregateInput = {
    quizId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type QuizQuestionAvgOrderByAggregateInput = {
    quizId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type QuizQuestionMaxOrderByAggregateInput = {
    quizId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type QuizQuestionMinOrderByAggregateInput = {
    quizId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type QuizQuestionSumOrderByAggregateInput = {
    quizId?: Prisma.SortOrder;
    questionId?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
};
export type QuizQuestionCreateNestedManyWithoutQuizInput = {
    create?: Prisma.XOR<Prisma.QuizQuestionCreateWithoutQuizInput, Prisma.QuizQuestionUncheckedCreateWithoutQuizInput> | Prisma.QuizQuestionCreateWithoutQuizInput[] | Prisma.QuizQuestionUncheckedCreateWithoutQuizInput[];
    connectOrCreate?: Prisma.QuizQuestionCreateOrConnectWithoutQuizInput | Prisma.QuizQuestionCreateOrConnectWithoutQuizInput[];
    createMany?: Prisma.QuizQuestionCreateManyQuizInputEnvelope;
    connect?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
};
export type QuizQuestionUncheckedCreateNestedManyWithoutQuizInput = {
    create?: Prisma.XOR<Prisma.QuizQuestionCreateWithoutQuizInput, Prisma.QuizQuestionUncheckedCreateWithoutQuizInput> | Prisma.QuizQuestionCreateWithoutQuizInput[] | Prisma.QuizQuestionUncheckedCreateWithoutQuizInput[];
    connectOrCreate?: Prisma.QuizQuestionCreateOrConnectWithoutQuizInput | Prisma.QuizQuestionCreateOrConnectWithoutQuizInput[];
    createMany?: Prisma.QuizQuestionCreateManyQuizInputEnvelope;
    connect?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
};
export type QuizQuestionUpdateManyWithoutQuizNestedInput = {
    create?: Prisma.XOR<Prisma.QuizQuestionCreateWithoutQuizInput, Prisma.QuizQuestionUncheckedCreateWithoutQuizInput> | Prisma.QuizQuestionCreateWithoutQuizInput[] | Prisma.QuizQuestionUncheckedCreateWithoutQuizInput[];
    connectOrCreate?: Prisma.QuizQuestionCreateOrConnectWithoutQuizInput | Prisma.QuizQuestionCreateOrConnectWithoutQuizInput[];
    upsert?: Prisma.QuizQuestionUpsertWithWhereUniqueWithoutQuizInput | Prisma.QuizQuestionUpsertWithWhereUniqueWithoutQuizInput[];
    createMany?: Prisma.QuizQuestionCreateManyQuizInputEnvelope;
    set?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    disconnect?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    delete?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    connect?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    update?: Prisma.QuizQuestionUpdateWithWhereUniqueWithoutQuizInput | Prisma.QuizQuestionUpdateWithWhereUniqueWithoutQuizInput[];
    updateMany?: Prisma.QuizQuestionUpdateManyWithWhereWithoutQuizInput | Prisma.QuizQuestionUpdateManyWithWhereWithoutQuizInput[];
    deleteMany?: Prisma.QuizQuestionScalarWhereInput | Prisma.QuizQuestionScalarWhereInput[];
};
export type QuizQuestionUncheckedUpdateManyWithoutQuizNestedInput = {
    create?: Prisma.XOR<Prisma.QuizQuestionCreateWithoutQuizInput, Prisma.QuizQuestionUncheckedCreateWithoutQuizInput> | Prisma.QuizQuestionCreateWithoutQuizInput[] | Prisma.QuizQuestionUncheckedCreateWithoutQuizInput[];
    connectOrCreate?: Prisma.QuizQuestionCreateOrConnectWithoutQuizInput | Prisma.QuizQuestionCreateOrConnectWithoutQuizInput[];
    upsert?: Prisma.QuizQuestionUpsertWithWhereUniqueWithoutQuizInput | Prisma.QuizQuestionUpsertWithWhereUniqueWithoutQuizInput[];
    createMany?: Prisma.QuizQuestionCreateManyQuizInputEnvelope;
    set?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    disconnect?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    delete?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    connect?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    update?: Prisma.QuizQuestionUpdateWithWhereUniqueWithoutQuizInput | Prisma.QuizQuestionUpdateWithWhereUniqueWithoutQuizInput[];
    updateMany?: Prisma.QuizQuestionUpdateManyWithWhereWithoutQuizInput | Prisma.QuizQuestionUpdateManyWithWhereWithoutQuizInput[];
    deleteMany?: Prisma.QuizQuestionScalarWhereInput | Prisma.QuizQuestionScalarWhereInput[];
};
export type QuizQuestionCreateNestedManyWithoutQuestionInput = {
    create?: Prisma.XOR<Prisma.QuizQuestionCreateWithoutQuestionInput, Prisma.QuizQuestionUncheckedCreateWithoutQuestionInput> | Prisma.QuizQuestionCreateWithoutQuestionInput[] | Prisma.QuizQuestionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuizQuestionCreateOrConnectWithoutQuestionInput | Prisma.QuizQuestionCreateOrConnectWithoutQuestionInput[];
    createMany?: Prisma.QuizQuestionCreateManyQuestionInputEnvelope;
    connect?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
};
export type QuizQuestionUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: Prisma.XOR<Prisma.QuizQuestionCreateWithoutQuestionInput, Prisma.QuizQuestionUncheckedCreateWithoutQuestionInput> | Prisma.QuizQuestionCreateWithoutQuestionInput[] | Prisma.QuizQuestionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuizQuestionCreateOrConnectWithoutQuestionInput | Prisma.QuizQuestionCreateOrConnectWithoutQuestionInput[];
    createMany?: Prisma.QuizQuestionCreateManyQuestionInputEnvelope;
    connect?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
};
export type QuizQuestionUpdateManyWithoutQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.QuizQuestionCreateWithoutQuestionInput, Prisma.QuizQuestionUncheckedCreateWithoutQuestionInput> | Prisma.QuizQuestionCreateWithoutQuestionInput[] | Prisma.QuizQuestionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuizQuestionCreateOrConnectWithoutQuestionInput | Prisma.QuizQuestionCreateOrConnectWithoutQuestionInput[];
    upsert?: Prisma.QuizQuestionUpsertWithWhereUniqueWithoutQuestionInput | Prisma.QuizQuestionUpsertWithWhereUniqueWithoutQuestionInput[];
    createMany?: Prisma.QuizQuestionCreateManyQuestionInputEnvelope;
    set?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    disconnect?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    delete?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    connect?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    update?: Prisma.QuizQuestionUpdateWithWhereUniqueWithoutQuestionInput | Prisma.QuizQuestionUpdateWithWhereUniqueWithoutQuestionInput[];
    updateMany?: Prisma.QuizQuestionUpdateManyWithWhereWithoutQuestionInput | Prisma.QuizQuestionUpdateManyWithWhereWithoutQuestionInput[];
    deleteMany?: Prisma.QuizQuestionScalarWhereInput | Prisma.QuizQuestionScalarWhereInput[];
};
export type QuizQuestionUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: Prisma.XOR<Prisma.QuizQuestionCreateWithoutQuestionInput, Prisma.QuizQuestionUncheckedCreateWithoutQuestionInput> | Prisma.QuizQuestionCreateWithoutQuestionInput[] | Prisma.QuizQuestionUncheckedCreateWithoutQuestionInput[];
    connectOrCreate?: Prisma.QuizQuestionCreateOrConnectWithoutQuestionInput | Prisma.QuizQuestionCreateOrConnectWithoutQuestionInput[];
    upsert?: Prisma.QuizQuestionUpsertWithWhereUniqueWithoutQuestionInput | Prisma.QuizQuestionUpsertWithWhereUniqueWithoutQuestionInput[];
    createMany?: Prisma.QuizQuestionCreateManyQuestionInputEnvelope;
    set?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    disconnect?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    delete?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    connect?: Prisma.QuizQuestionWhereUniqueInput | Prisma.QuizQuestionWhereUniqueInput[];
    update?: Prisma.QuizQuestionUpdateWithWhereUniqueWithoutQuestionInput | Prisma.QuizQuestionUpdateWithWhereUniqueWithoutQuestionInput[];
    updateMany?: Prisma.QuizQuestionUpdateManyWithWhereWithoutQuestionInput | Prisma.QuizQuestionUpdateManyWithWhereWithoutQuestionInput[];
    deleteMany?: Prisma.QuizQuestionScalarWhereInput | Prisma.QuizQuestionScalarWhereInput[];
};
export type QuizQuestionCreateWithoutQuizInput = {
    position: number;
    question: Prisma.QuestionCreateNestedOneWithoutQuizzesInput;
};
export type QuizQuestionUncheckedCreateWithoutQuizInput = {
    questionId: number;
    position: number;
};
export type QuizQuestionCreateOrConnectWithoutQuizInput = {
    where: Prisma.QuizQuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuizQuestionCreateWithoutQuizInput, Prisma.QuizQuestionUncheckedCreateWithoutQuizInput>;
};
export type QuizQuestionCreateManyQuizInputEnvelope = {
    data: Prisma.QuizQuestionCreateManyQuizInput | Prisma.QuizQuestionCreateManyQuizInput[];
    skipDuplicates?: boolean;
};
export type QuizQuestionUpsertWithWhereUniqueWithoutQuizInput = {
    where: Prisma.QuizQuestionWhereUniqueInput;
    update: Prisma.XOR<Prisma.QuizQuestionUpdateWithoutQuizInput, Prisma.QuizQuestionUncheckedUpdateWithoutQuizInput>;
    create: Prisma.XOR<Prisma.QuizQuestionCreateWithoutQuizInput, Prisma.QuizQuestionUncheckedCreateWithoutQuizInput>;
};
export type QuizQuestionUpdateWithWhereUniqueWithoutQuizInput = {
    where: Prisma.QuizQuestionWhereUniqueInput;
    data: Prisma.XOR<Prisma.QuizQuestionUpdateWithoutQuizInput, Prisma.QuizQuestionUncheckedUpdateWithoutQuizInput>;
};
export type QuizQuestionUpdateManyWithWhereWithoutQuizInput = {
    where: Prisma.QuizQuestionScalarWhereInput;
    data: Prisma.XOR<Prisma.QuizQuestionUpdateManyMutationInput, Prisma.QuizQuestionUncheckedUpdateManyWithoutQuizInput>;
};
export type QuizQuestionScalarWhereInput = {
    AND?: Prisma.QuizQuestionScalarWhereInput | Prisma.QuizQuestionScalarWhereInput[];
    OR?: Prisma.QuizQuestionScalarWhereInput[];
    NOT?: Prisma.QuizQuestionScalarWhereInput | Prisma.QuizQuestionScalarWhereInput[];
    quizId?: Prisma.IntFilter<"QuizQuestion"> | number;
    questionId?: Prisma.IntFilter<"QuizQuestion"> | number;
    position?: Prisma.IntFilter<"QuizQuestion"> | number;
};
export type QuizQuestionCreateWithoutQuestionInput = {
    position: number;
    quiz: Prisma.QuizCreateNestedOneWithoutQuestionsInput;
};
export type QuizQuestionUncheckedCreateWithoutQuestionInput = {
    quizId: number;
    position: number;
};
export type QuizQuestionCreateOrConnectWithoutQuestionInput = {
    where: Prisma.QuizQuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuizQuestionCreateWithoutQuestionInput, Prisma.QuizQuestionUncheckedCreateWithoutQuestionInput>;
};
export type QuizQuestionCreateManyQuestionInputEnvelope = {
    data: Prisma.QuizQuestionCreateManyQuestionInput | Prisma.QuizQuestionCreateManyQuestionInput[];
    skipDuplicates?: boolean;
};
export type QuizQuestionUpsertWithWhereUniqueWithoutQuestionInput = {
    where: Prisma.QuizQuestionWhereUniqueInput;
    update: Prisma.XOR<Prisma.QuizQuestionUpdateWithoutQuestionInput, Prisma.QuizQuestionUncheckedUpdateWithoutQuestionInput>;
    create: Prisma.XOR<Prisma.QuizQuestionCreateWithoutQuestionInput, Prisma.QuizQuestionUncheckedCreateWithoutQuestionInput>;
};
export type QuizQuestionUpdateWithWhereUniqueWithoutQuestionInput = {
    where: Prisma.QuizQuestionWhereUniqueInput;
    data: Prisma.XOR<Prisma.QuizQuestionUpdateWithoutQuestionInput, Prisma.QuizQuestionUncheckedUpdateWithoutQuestionInput>;
};
export type QuizQuestionUpdateManyWithWhereWithoutQuestionInput = {
    where: Prisma.QuizQuestionScalarWhereInput;
    data: Prisma.XOR<Prisma.QuizQuestionUpdateManyMutationInput, Prisma.QuizQuestionUncheckedUpdateManyWithoutQuestionInput>;
};
export type QuizQuestionCreateManyQuizInput = {
    questionId: number;
    position: number;
};
export type QuizQuestionUpdateWithoutQuizInput = {
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    question?: Prisma.QuestionUpdateOneRequiredWithoutQuizzesNestedInput;
};
export type QuizQuestionUncheckedUpdateWithoutQuizInput = {
    questionId?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type QuizQuestionUncheckedUpdateManyWithoutQuizInput = {
    questionId?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type QuizQuestionCreateManyQuestionInput = {
    quizId: number;
    position: number;
};
export type QuizQuestionUpdateWithoutQuestionInput = {
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    quiz?: Prisma.QuizUpdateOneRequiredWithoutQuestionsNestedInput;
};
export type QuizQuestionUncheckedUpdateWithoutQuestionInput = {
    quizId?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type QuizQuestionUncheckedUpdateManyWithoutQuestionInput = {
    quizId?: Prisma.IntFieldUpdateOperationsInput | number;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type QuizQuestionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    quizId?: boolean;
    questionId?: boolean;
    position?: boolean;
    quiz?: boolean | Prisma.QuizDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["quizQuestion"]>;
export type QuizQuestionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    quizId?: boolean;
    questionId?: boolean;
    position?: boolean;
    quiz?: boolean | Prisma.QuizDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["quizQuestion"]>;
export type QuizQuestionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    quizId?: boolean;
    questionId?: boolean;
    position?: boolean;
    quiz?: boolean | Prisma.QuizDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["quizQuestion"]>;
export type QuizQuestionSelectScalar = {
    quizId?: boolean;
    questionId?: boolean;
    position?: boolean;
};
export type QuizQuestionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"quizId" | "questionId" | "position", ExtArgs["result"]["quizQuestion"]>;
export type QuizQuestionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    quiz?: boolean | Prisma.QuizDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type QuizQuestionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    quiz?: boolean | Prisma.QuizDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type QuizQuestionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    quiz?: boolean | Prisma.QuizDefaultArgs<ExtArgs>;
    question?: boolean | Prisma.QuestionDefaultArgs<ExtArgs>;
};
export type $QuizQuestionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "QuizQuestion";
    objects: {
        quiz: Prisma.$QuizPayload<ExtArgs>;
        question: Prisma.$QuestionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        quizId: number;
        questionId: number;
        position: number;
    }, ExtArgs["result"]["quizQuestion"]>;
    composites: {};
};
export type QuizQuestionGetPayload<S extends boolean | null | undefined | QuizQuestionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QuizQuestionPayload, S>;
export type QuizQuestionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QuizQuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QuizQuestionCountAggregateInputType | true;
};
export interface QuizQuestionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['QuizQuestion'];
        meta: {
            name: 'QuizQuestion';
        };
    };
    findUnique<T extends QuizQuestionFindUniqueArgs>(args: Prisma.SelectSubset<T, QuizQuestionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QuizQuestionClient<runtime.Types.Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QuizQuestionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QuizQuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuizQuestionClient<runtime.Types.Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QuizQuestionFindFirstArgs>(args?: Prisma.SelectSubset<T, QuizQuestionFindFirstArgs<ExtArgs>>): Prisma.Prisma__QuizQuestionClient<runtime.Types.Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QuizQuestionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QuizQuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuizQuestionClient<runtime.Types.Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QuizQuestionFindManyArgs>(args?: Prisma.SelectSubset<T, QuizQuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QuizQuestionCreateArgs>(args: Prisma.SelectSubset<T, QuizQuestionCreateArgs<ExtArgs>>): Prisma.Prisma__QuizQuestionClient<runtime.Types.Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QuizQuestionCreateManyArgs>(args?: Prisma.SelectSubset<T, QuizQuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QuizQuestionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QuizQuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QuizQuestionDeleteArgs>(args: Prisma.SelectSubset<T, QuizQuestionDeleteArgs<ExtArgs>>): Prisma.Prisma__QuizQuestionClient<runtime.Types.Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QuizQuestionUpdateArgs>(args: Prisma.SelectSubset<T, QuizQuestionUpdateArgs<ExtArgs>>): Prisma.Prisma__QuizQuestionClient<runtime.Types.Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QuizQuestionDeleteManyArgs>(args?: Prisma.SelectSubset<T, QuizQuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QuizQuestionUpdateManyArgs>(args: Prisma.SelectSubset<T, QuizQuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QuizQuestionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QuizQuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QuizQuestionUpsertArgs>(args: Prisma.SelectSubset<T, QuizQuestionUpsertArgs<ExtArgs>>): Prisma.Prisma__QuizQuestionClient<runtime.Types.Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QuizQuestionCountArgs>(args?: Prisma.Subset<T, QuizQuestionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QuizQuestionCountAggregateOutputType> : number>;
    aggregate<T extends QuizQuestionAggregateArgs>(args: Prisma.Subset<T, QuizQuestionAggregateArgs>): Prisma.PrismaPromise<GetQuizQuestionAggregateType<T>>;
    groupBy<T extends QuizQuestionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QuizQuestionGroupByArgs['orderBy'];
    } : {
        orderBy?: QuizQuestionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QuizQuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QuizQuestionFieldRefs;
}
export interface Prisma__QuizQuestionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    quiz<T extends Prisma.QuizDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QuizDefaultArgs<ExtArgs>>): Prisma.Prisma__QuizClient<runtime.Types.Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    question<T extends Prisma.QuestionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.QuestionDefaultArgs<ExtArgs>>): Prisma.Prisma__QuestionClient<runtime.Types.Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QuizQuestionFieldRefs {
    readonly quizId: Prisma.FieldRef<"QuizQuestion", 'Int'>;
    readonly questionId: Prisma.FieldRef<"QuizQuestion", 'Int'>;
    readonly position: Prisma.FieldRef<"QuizQuestion", 'Int'>;
}
export type QuizQuestionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizQuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuizQuestionOmit<ExtArgs> | null;
    include?: Prisma.QuizQuestionInclude<ExtArgs> | null;
    where: Prisma.QuizQuestionWhereUniqueInput;
};
export type QuizQuestionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizQuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuizQuestionOmit<ExtArgs> | null;
    include?: Prisma.QuizQuestionInclude<ExtArgs> | null;
    where: Prisma.QuizQuestionWhereUniqueInput;
};
export type QuizQuestionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizQuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuizQuestionOmit<ExtArgs> | null;
    include?: Prisma.QuizQuestionInclude<ExtArgs> | null;
    where?: Prisma.QuizQuestionWhereInput;
    orderBy?: Prisma.QuizQuestionOrderByWithRelationInput | Prisma.QuizQuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuizQuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuizQuestionScalarFieldEnum | Prisma.QuizQuestionScalarFieldEnum[];
};
export type QuizQuestionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizQuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuizQuestionOmit<ExtArgs> | null;
    include?: Prisma.QuizQuestionInclude<ExtArgs> | null;
    where?: Prisma.QuizQuestionWhereInput;
    orderBy?: Prisma.QuizQuestionOrderByWithRelationInput | Prisma.QuizQuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuizQuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuizQuestionScalarFieldEnum | Prisma.QuizQuestionScalarFieldEnum[];
};
export type QuizQuestionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizQuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuizQuestionOmit<ExtArgs> | null;
    include?: Prisma.QuizQuestionInclude<ExtArgs> | null;
    where?: Prisma.QuizQuestionWhereInput;
    orderBy?: Prisma.QuizQuestionOrderByWithRelationInput | Prisma.QuizQuestionOrderByWithRelationInput[];
    cursor?: Prisma.QuizQuestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuizQuestionScalarFieldEnum | Prisma.QuizQuestionScalarFieldEnum[];
};
export type QuizQuestionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizQuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuizQuestionOmit<ExtArgs> | null;
    include?: Prisma.QuizQuestionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuizQuestionCreateInput, Prisma.QuizQuestionUncheckedCreateInput>;
};
export type QuizQuestionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QuizQuestionCreateManyInput | Prisma.QuizQuestionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QuizQuestionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizQuestionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuizQuestionOmit<ExtArgs> | null;
    data: Prisma.QuizQuestionCreateManyInput | Prisma.QuizQuestionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.QuizQuestionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QuizQuestionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizQuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuizQuestionOmit<ExtArgs> | null;
    include?: Prisma.QuizQuestionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuizQuestionUpdateInput, Prisma.QuizQuestionUncheckedUpdateInput>;
    where: Prisma.QuizQuestionWhereUniqueInput;
};
export type QuizQuestionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QuizQuestionUpdateManyMutationInput, Prisma.QuizQuestionUncheckedUpdateManyInput>;
    where?: Prisma.QuizQuestionWhereInput;
    limit?: number;
};
export type QuizQuestionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizQuestionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuizQuestionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuizQuestionUpdateManyMutationInput, Prisma.QuizQuestionUncheckedUpdateManyInput>;
    where?: Prisma.QuizQuestionWhereInput;
    limit?: number;
    include?: Prisma.QuizQuestionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QuizQuestionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizQuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuizQuestionOmit<ExtArgs> | null;
    include?: Prisma.QuizQuestionInclude<ExtArgs> | null;
    where: Prisma.QuizQuestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuizQuestionCreateInput, Prisma.QuizQuestionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QuizQuestionUpdateInput, Prisma.QuizQuestionUncheckedUpdateInput>;
};
export type QuizQuestionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizQuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuizQuestionOmit<ExtArgs> | null;
    include?: Prisma.QuizQuestionInclude<ExtArgs> | null;
    where: Prisma.QuizQuestionWhereUniqueInput;
};
export type QuizQuestionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuizQuestionWhereInput;
    limit?: number;
};
export type QuizQuestionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuizQuestionSelect<ExtArgs> | null;
    omit?: Prisma.QuizQuestionOmit<ExtArgs> | null;
    include?: Prisma.QuizQuestionInclude<ExtArgs> | null;
};
